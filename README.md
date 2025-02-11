
# Annuity Calculator Application

This project is an Annuity Calculator built with Angular. The application allows users to calculate monthly withdrawals and interest earnings for different types of annuity payouts, including fixed years payout and monthly withdrawals.

## Features:
- **Fixed Years Payout**: Users can select a number of years and receive a fixed monthly payment for that duration, with interest applied on the remaining balance.
- **Monthly Withdrawal**: Users can specify a monthly withdrawal amount, and the app calculates how long the principal will last, considering interest accumulation and withdrawals.
- **Dynamic Form Inputs**: The form includes validation and automatically formats large numbers with thousands separators.
- **Interest Calculation**: Interest is calculated monthly and applied to the remaining balance.
- **Age Limit**: The calculation stops either when the balance is zero or when the user reaches 100 years of age.

## How to Use
1. **Input Principal**: Enter the amount of money you want to invest or withdraw.
2. **Select Payout Type**: Choose between "Fixed Years Payout" or "Monthly Withdrawal".
  - For Fixed Years Payout, choose the number of years.
  - For Monthly Withdrawal, enter the amount to withdraw each month.
3. **Input Interest Rate**: Enter an interest rate between 1% and 20%.
4. **Submit**: Click "Calculate" to generate the results.
5. **Results**: The application will show:
  - Total of payments.
  - Total interest return.
  - Duration of payments based on your input.

## Components Overview

### 1. **Request Form**
The form allows users to input the necessary data to calculate the annuity:
- `payoutType`: Allows users to choose between fixed years or monthly withdrawal options.
- `principal`: The starting amount of money to invest or withdraw from.
- `rate`: The annual interest rate.

**Form Validation**:
- Minimum principal is $5,000.
- Maximum principal is $5,000,000.
- Interest rate must be between 1% and 20%.
  

### 2. **Result Display**
Displays the calculated results based on the user's input:
- For **Fixed Years**, shows the number of years the annuity will last and the monthly withdrawal.
- For **Monthly Withdrawal**, calculates how long the withdrawals will last and the total interest earned.
  

### 3. **Schedule Component**
Generates a detailed year-by-year and month-by-month payment schedule. It includes:
- Monthly payment.
- Interest earned.
- Remaining balance after each payment.
  

### 4. **Chart Display**
Displays a visual chart showing how the balance decreases over time with withdrawals and interest accumulation.

## Directives and Pipes
- **Thousand Separator Directive**: Formats large numbers to include commas for thousands.
- **Absolute Value Pipe**: Ensures that negative values are displayed as absolute values when needed.

## Running the Application
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   ng serve
   ```

3. Open `http://localhost:4200/annuity-calculator` in your browser.

## Project Structure
```
src/
├── app/
│   ├── annuity-calculator/
│   ├── schedule/
│   ├── request-form/
│   ├── result/
│   ├── chart/
│   ├── pipes/
│   ├── directives/
│   └── shared/
└── assets/
```


