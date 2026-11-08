import { skillGroups } from "../../data/content";

const allSkills = skillGroups.flatMap((group) => group.skills);

// Returns the skill (icon and color) that matches a stack name
export const findSkill = (name) => allSkills.find((skill) => skill.name === name);