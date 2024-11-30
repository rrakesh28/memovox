import { Note } from "@/types/Note";

const calculateStreak = (mostRecentDate: Note): boolean => {
    const currentDate = new Date();
    const lastDate = new Date(mostRecentDate.year, mostRecentDate.month - 1, mostRecentDate.date);

    currentDate.setHours(0, 0, 0, 0);
    lastDate.setHours(0, 0, 0, 0);

    const diffTime = currentDate.getTime() - lastDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 1) {
        return true;
    } else if (diffDays > 1) {
        return false; 
    }

    return false;
};

export { calculateStreak };
