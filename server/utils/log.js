import chalk from 'chalk';

const color = chalk.rgb(255, 216, 91);

const log = (string = '') => console.log(color(string));

export default log;
