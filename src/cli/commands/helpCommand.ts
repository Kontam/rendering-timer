import { Command } from "../../types";

type ExMethod = {
  commands?: Command[];
}

export const helpCommand: Command & ExMethod = {
  name: "help",
  optionTypes: {},
  helpText: "\n"
  + "Syntax:	rendered [command] [options]\n\n"
  + "Examples:\n"
  +	"    rendered run\n"
  + "    rendered audit\n"
  + "    rendered analyze\n"
  + "    rendered help\n\n"
  + "Commands:",
  exec: async function () {
    console.log(this.helpText);
    if (this.commands && this.commands.length > 0) {
      this.commands.forEach(command => {
        if (command.name === this.name) return;
        console.log(command.helpText);
      })
    }
  },
};
