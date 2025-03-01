export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    xpLevel: number;
  }
  
  export interface PlanIndicator {
    id: number;
    levelId: number;
    levelName: string;
    categoryId: number;
    categoryName: string;
    userId: number;
    progressed: number;
    lastDateCompleted: string;
    startDate: string;
    duration: string;
    isFreezed: boolean;
    isDone: boolean;
  }
  
  export interface CheckQuest {
    id: number;
    recomendedActivity: string;
    mesure: string;
  }
  
  export interface Quest {
    id: number;
    xpLevel: number;
    date: string;
    checkQuestId: number | null;
    checkQuest?: CheckQuest;
    isDone: boolean;
  }
  
  export interface HomeData {
    user: User;
    plans: PlanIndicator[];
    quests: Quest[];
  }
  