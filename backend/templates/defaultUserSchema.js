export const defaultUserSchema = {
    user: {
        id: '2',
        name: 'John Doe',
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        streak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        selectedPet: 'cat',
        petAccessories: [],
        darkMode: false,
        reminderTime: '09:00',
        fontSize: 'normal'
    },
    tasks: [],
    badges: [],
    transactions: [],
    savingsGoal: {
        target: 1000,
        current: 0,
        title: 'Emergency Fund',
    },
    cashBalance: 0,
    creditBalance: 0,
};