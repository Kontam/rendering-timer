import { Command } from "../../types";

type ExMethod = {
  commands?: Command[];
}

export const helpCommand: Command & ExMethod = {
  name: "help",
  optionTypes: {},
  helpText: "\n"
  + "Syntax:	rtimer [command] [options]\n\n"
  + "Examples:\n"
  +	"    rtimer run\n"
  + "    rtimer audit\n"
  + "    rtimer analyze\n"
  + "    rtimer help\n\n"
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
