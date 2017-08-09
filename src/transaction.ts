async transaction<T>(runInTransaction: (entityManger: EntityManager) => Promise<T>): Promise<T> {

        if (this.connection.driver instanceof MongoDriver)
            throw new Error(`Transactions aren't supported by MongoDB.`);

        if (this.queryRunner && this.queryRunner.isReleased)
            throw new QueryRunnerProviderAlreadyReleasedError();

        if (this.queryRunner && this.queryRunner.isTransactionActive)
            throw new Error(`Cannot start transaction because its already started`);

        const usedQueryRunner = this.queryRunner || this.connection.createQueryRunner();
        const transactionEntityManager = new EntityManagerFactory().create(this.connection, usedQueryRunner);

        try {
            await usedQueryRunner.startTransaction();
            const result = await runInTransaction(transactionEntityManager);
            await usedQueryRunner.commitTransaction();
            return result;

        } catch (err) {
            try { // we throw original error even if rollback thrown an error
                await usedQueryRunner.rollbackTransaction();
            } catch (rollbackError) { }
                throw err;

        } finally {
            if (!this.queryRunner) // if we used a new query runner provider then release it
                await usedQueryRunner.release();
        }
    }