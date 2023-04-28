# README

## TODO Items
- None

## Known Issues
- Adding the required columns `dislikes` and `usages` to the `Prompt` table without a default value is not possible if the table is not empty. This may cause issues during the execution of the code.
- Adding a unique constraint covering the columns `prompt` on the table `Prompt` will fail if there are existing duplicate values. This may cause issues during the execution of the code.