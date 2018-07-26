# editing-funcs-for-vscode README


## Installation

* To develop:
  1. `npm install`
  2. then run in debug mode

* To use:
  1. copy to your extensions folder
  2. `npm install`
  
* To use and develop at the same time:
  1. copy to your extensions folder
  2. `npm install` 
  3. `npm run watch`
  4. open the folder in vscode
  5. modify `src/extension.ts` or `src/**/*` in general

## User Guide

1. Select some text, for example something like:  
  
ADD_USER  
DELETE_USER  
UPDATE_USER  
REPLACE_USER  
UPDATE_USER  
REPLACE_USER  
  
2. Open the command palette (`Ctrl+P` on Windows/Linux by default)
3. Type `wrap lines with` and press `Enter`
4. Type `"` and press `Enter`
5. Voilá, you get:

"ADD_USER"  
"DELETE_USER"  
"UPDATE_USER"  
"REPLACE_USER"  
"UPDATE_USER"  
"REPLACE_USER"  

## Currently implemented, more to come

`wrap lines with`  
`strip lines`  
`remove empty lines`  
`insert after each line`  