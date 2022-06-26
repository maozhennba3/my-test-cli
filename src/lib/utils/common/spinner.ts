import ora from 'ora';
import chalk from 'chalk';

export interface LastMsgType {
    symbol: string;
    text: string
}
const spinner = ora();
let lastMsg: LastMsgType = null;

const logWithSpinner = (symbol: string, msg?: string) => {
    if (!msg) {
        msg = symbol;
        symbol = chalk.green('✔');
    }
    if (lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: spinner.text,
        })
    }
    spinner.text = ' ' + msg
    lastMsg = {
        symbol: symbol + ' ',
        text: msg,
    }
    spinner.start();
}

const stopSpinner = (persist?: boolean) => {
    // 如果persist坚持为true且存在最后的msg则暂停示例并返回
    if (lastMsg && persist !== false) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text,
        })
    } else {
        spinner.stop();
    }
    lastMsg = null;
}

const pauseSpinner = () => {
    spinner.stop();
}

const resumeSpinner = () => {
    spinner.start();
}

export default {
    logWithSpinner,
    stopSpinner,
    pauseSpinner,
    resumeSpinner
}