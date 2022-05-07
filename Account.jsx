// #region  H E A D E R
// <copyright file="Account.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    ATM Account Component
 *      Module:   Modules (./Account.js)
 *      Project:  MicroCODE Common Library
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     February 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the 'Account' component of an REACT ATM App.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Style Guide
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2. AirBnB JavaScript Style Guide
 *         https://github.com/airbnb/javascript
 *
 *      3. Turing School Style Guide
 *         https://github.com/turingschool-examples/javascript/tree/main/es5
 *
 *      4. MDN Web Docs - JavaScript Classes
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 *
 *      5. JSDoc - How to properly document JavaScript Code.
 *         https://
 *
 *      6. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  04-May-2022   TJM-MCODE  {0001}    New module for a Bank ATM App.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * Account() - handles Deposits and Withdraws into a Bank Account from an ATM.
 *             This is the PARENT React Component.
 *
 * @api public
 *
 * @param {type} none no arguments.
 * @returns JSX code to render the Account Component with Deposit and Withdraw controls.
 *
 * @example
 *
 *      Account();
 *
 */
const Account = () =>
{
    //     local store,       function to update,           intial state
    const [transactionAmount, setTransactionAmount] = React.useState(0);
    const [accountBalance, setAccountBalance] = React.useState(0);
    const [atmMode, setAtmMode] = React.useState('');

    const [isDepositingFunds, setIsDepositingFunds] = React.useState(true);

    let status = `Your Account Balance is: $${accountBalance}`;

    console.log(`Account Rendered with isDepositingFunds: ${isDepositingFunds}`);

    const handleChange = (event) =>
    {
        console.log(`handleChange ${event.target.value}`);
        setTransactionAmount(Number(event.target.value));
    };

    const handleSubmit = () =>
    {
        let newBalance = isDepositingFunds ? accountBalance + transactionAmount : accountBalance - transactionAmount;

        setAccountBalance(newBalance);
        setTransactionAmount(0);
        event.preventDefault();
    };

    const isValid = (accountBalance > 0) || isDepositingFunds;

    // "AtmTransaction" is a CHILD Component of the "Account" Component...
    return (
        <form onSubmit={handleSubmit}>
            <h2 id="total">{status}</h2>
            <br />
            &nbsp;&nbsp;
            <button className="btn btn-success" onClick={() => setIsDepositingFunds(true)}>Deposit</button>
            <span>&nbsp;&nbsp;</span>
            <button className="btn btn-warning" onClick={() => setIsDepositingFunds(false)}>Withdraw</button>
            <br />
            <br />
            <AtmTransaction onChange={handleChange} isDeposit={isDepositingFunds} funds={transactionAmount} isValid={isValid}></AtmTransaction>
        </form>
    );
};

/**
 * AtmTransaction() - handles Deposits and Withdraws transaction on the parent Account.
 *                    This is a CHILD component of "Account".
 *
 * @api public
 *
 * @param {function} onChange a function in the parent component to handle changes to the funds value.
 * @param {boolean} isDeposit a value indicating whether or not this transaction is a deposit.
 * @param {number} funds a value representing the value of the transaction.
 * @param {boolean} isValid a value indicating whether or not this transaction is allowed.
 * @returns JSX code to render the Account balance.
 *
 * @example
 *
 *      <AtmTransaction onChange={handleChange} isDeposit={isDeposit}></AtmTransaction>
 *
 */
const AtmTransaction = ({onChange, isDeposit, funds, isValid}) =>
{
    const transactionType = ["Deposit", "Withdraw"];

    console.log(`ATM isDeposit: ${isDeposit}`);

    if (funds == 0)
    {
        funds = '';  // display nothing for ZERO
    }

    return (
        <div id="transaction-data">
            <label className="label huge">
                <h3> {transactionType[Number(!isDeposit)]}</h3>
                <input className="form-control form-control" type="number" width="200" onChange={onChange} value={funds}></input>
                &nbsp;&nbsp;
                <input className="btn btn-info" type="submit" width="200" value="Submit" disabled={!isValid}></input>
            </label>
        </div>
    );
};

// #region  R E A C T   E X E C U T I O N

// "Account" is the PARENT React Component, rendering it creates the control elements of the UI
// which are linked to event handlers.
ReactDOM.render(<Account />, document.getElementById("root"));

// #endregion

// #endregion
// #endregion