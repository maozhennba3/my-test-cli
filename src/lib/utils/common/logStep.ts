import ora from 'ora';

const logStep = async (str: string, cb: () => void) => {
    const spinner = ora(str).start();
    try {
        cb && await cb();
        spinner.succeed();
    } catch (err) {
        spinner.fail();
        throw err;
    }
}

export default logStep;
