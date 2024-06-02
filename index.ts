#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

class BankAccount {
        private balance: number;
        public accountNumber: number;
        public accountHolder: string;
    
        constructor(accountNumber: number, accountHolder: string, initialBalance: number) {
            this.accountNumber = accountNumber;
            this.accountHolder = accountHolder;
            this.balance = initialBalance;
        }
    
    
        public checkBalance(): void {
            console.log(chalk.bgCyanBright.italic.bold(`\nCurrent balance: $: ${this.balance}`));
        }
    
        public deposit(amount: number): void {
            this.balance += amount;
            console.log(chalk.bgYellowBright.italic.bold(`\nDeposit of $: ${amount} successful. New balance: $: ${this.balance}`));
        }
    
        public withdraw(amount: number): void {
            if (amount > this.balance) {
                console.log(chalk.bgRedBright.italic.bold('\nInsufficient funds!'));
            } else {
                this.balance -= amount;
                console.log(chalk.bgGreenBright.italic.bold(`\nWithdrawal of $: ${amount} successful. Remaining balance: $: ${this.balance}`));
            }
        }
    
        public getAccountDetails(): void {
            console.log(chalk.bgMagentaBright.italic.bold(`\nAccount Number: ${this.accountNumber}, Account Holder: ${this.accountHolder}`));
        }
    }

    const accounts: BankAccount[] = [
            new BankAccount(10021, 'Nadia Wrada', 1500),
            new BankAccount(10022, 'Zoha Khan', 1000),
            new BankAccount(10023, 'Saba Owais', 2000),
        ];

        function findAccount(accountNumber: number): BankAccount | undefined {
                return accounts.find(account => account.accountNumber === accountNumber);
            }

function printBanner(): void {
    const asciiArt = `
                        
       '  ███    ███ ██    ██     ██████   █████  ███    ██ ██   ██     
       '  ████  ████  ██  ██      ██   ██ ██   ██ ████   ██ ██  ██      
       '  ██ ████ ██   ████       ██████  ███████ ██ ██  ██ █████       
       '  ██  ██  ██    ██        ██   ██ ██   ██ ██  ██ ██ ██  ██      
       '  ██      ██    ██        ██████  ██   ██ ██   ████ ██   ██     
       '                                                                
       '                                                                
       '   █████   ██████  ██████  ██████  ██    ██ ███    ██ ████████  
       '  ██   ██ ██      ██      ██    ██ ██    ██ ████   ██    ██     
       '  ███████ ██      ██      ██    ██ ██    ██ ██ ██  ██    ██     
       '  ██   ██ ██      ██      ██    ██ ██    ██ ██  ██ ██    ██     
       '  ██   ██  ██████  ██████  ██████   ██████  ██   ████    ██     
       '                                                                
       `;                                                                              
    console.log(chalk.yellowBright(asciiArt));
}

async function bankProgram(): Promise<void> {
    printBanner();

    let running = true;
    
        while (running) {
            const { accountNumber } = await inquirer.prompt({
                type: 'input',
                name: 'accountNumber',
                message: 'Enter Your Account Number:'
            });
    
            const account = findAccount(parseInt(accountNumber, 10));
    
            if (!account) {
                console.log(chalk.bgGreenBright.italic.bold('\nAccount not found!'));
                continue;
            }
    
            console.log(chalk.bgYellowBright.italic.bold(`\nWelcome, ${account.accountHolder}`));
    
            let accountSession = true;
            while (accountSession) {
                const { operation } = await inquirer.prompt({
                    type: 'list',
                    name: 'operation',
                    message: 'Select an operation:',
                    choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit'],
                });
    
                switch (operation.toLowerCase()) {
                    case 'check balance':
                        account.checkBalance();
                        break;
                    case 'deposit':
                        const { depositAmount } = await inquirer.prompt({
                            type: 'input',
                            name: 'depositAmount',
                            message: 'Enter the amount to deposit:'
                        });
                        account.deposit(parseFloat(depositAmount));
                        break;
                    case 'withdraw':
                        const { withdrawAmount } = await inquirer.prompt({
                            type: 'input',
                            name: 'withdrawAmount',
                            message: 'Enter the amount to withdraw:'
                        });
                        account.withdraw(parseFloat(withdrawAmount));
                        break;
                    case 'exit':
                        accountSession = false;
                        console.log(chalk.bgBlueBright.italic.bold('\nExiting bank program...'));
                        break;
                    default:
                        console.log(chalk.bgRedBright.italic.bold('\nInvalid operation selected!'));
                }
            }
    
            const { exitProgram } = await inquirer.prompt({
                type: 'confirm',
                name: 'exitProgram',
                message: 'Do you want to exit the bank program?',
            });
    
            if (exitProgram) {
                running = false;
                console.log(chalk.bgBlueBright.italic.bold('\nExiting bank program...'));
            }
        }
    
        console.log(chalk.bgYellowBright.italic.bold('\nThank you for using our bank services. Have a great day!'));
    }
    
    bankProgram();
    
    