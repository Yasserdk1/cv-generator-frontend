import { Experience } from "./experience.model";
import { Formation } from "./formation.model";
import { Language } from "./language.model";
import { Skill } from "./skill.model";

export interface CV {
  id?: number;
  adresse: string;
  dateNaissance: string;
  photo?: string;
  userId?: number;
  formations: Formation[];
  experiences: Experience[];
  competences: Skill[];
  langues: Language[];
}
