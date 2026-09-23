import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await connectDatabase();
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            {
                username: 'maya_runner',
                email: 'maya@example.com',
                profile: { displayName: 'Maya Chen', fitnessLevel: 'advanced' },
            },
            {
                username: 'jordan_lifts',
                email: 'jordan@example.com',
                profile: { displayName: 'Jordan Brooks', fitnessLevel: 'intermediate' },
            },
            {
                username: 'sam_moves',
                email: 'sam@example.com',
                profile: { displayName: 'Sam Rivera', fitnessLevel: 'beginner' },
            },
        ]);
        await Team.create([
            {
                name: 'Sunrise Striders',
                description: 'A friendly group building consistent morning mileage.',
                members: [users[0]._id, users[2]._id],
            },
            {
                name: 'Strength Circuit',
                description: 'Short, focused strength sessions for busy schedules.',
                members: [users[0]._id, users[1]._id],
            },
        ]);
        await Activity.create([
            { userId: users[0]._id, type: 'running', durationMinutes: 42, points: 84, notes: 'Tempo run around the lake.' },
            { userId: users[0]._id, type: 'cycling', durationMinutes: 55, points: 110, notes: 'Steady ride on the greenway.' },
            { userId: users[1]._id, type: 'strength', durationMinutes: 35, points: 70, notes: 'Full-body dumbbell circuit.' },
            { userId: users[2]._id, type: 'walking', durationMinutes: 30, points: 45, notes: 'Brisk walk after lunch.' },
        ]);
        await Leaderboard.create([
            { userId: users[0]._id, points: 194, activities: 2, rank: 1 },
            { userId: users[1]._id, points: 70, activities: 1, rank: 2 },
            { userId: users[2]._id, points: 45, activities: 1, rank: 3 },
        ]);
        await Workout.create([
            {
                title: '20-Minute Core Reset',
                description: 'Dead bugs, planks, and bird dogs in three controlled rounds.',
                fitnessLevel: 'beginner',
                durationMinutes: 20,
            },
            {
                title: 'Dumbbell Strength Builder',
                description: 'Compound lifts and mobility work for a balanced full-body session.',
                fitnessLevel: 'intermediate',
                durationMinutes: 35,
            },
            {
                title: 'Hill Repeat Challenge',
                description: 'A demanding running workout with warm-up, repeats, and recovery.',
                fitnessLevel: 'advanced',
                durationMinutes: 45,
            },
        ]);
        console.log('Seeded users, teams, activities, leaderboard, and workouts');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
    }
}
seedDatabase();
