puts "🌱 SEEDING DATA....."

# Database cleaning
User.destroy_all
AdminUser.destroy_all
Workout.destroy_all
Exercise.destroy_all

# Create Admin User
admin_user = AdminUser.create!(firstname: 'Admin', lastname: 'User', email: 'admin@example.com', password: 'adminpassword')

# Create Users
usernames = ['John', 'Jane', 'Michael', 'Emily', 'Robert', 'Sophia', 'William', 'Olivia', 'Michaela', 'James']
usernames.each_with_index do |username, index|
  User.create!(firstname: username, lastname: 'Doe', email: "#{username.downcase}@example.com", password: "password#{index + 1}")
end

# Create Workouts
workoutnames = ['Morning Workout', 'Evening Workout', 'Cardio Blast', 'Leg Day - Hammstrings', 'Leg Day - Quads',  'Leg Day - Glutes', 'Core Crusher', 'Upper Body Burn - Back',  'Upper Body Burn - Shoulders ', 'Upper Body Burn - Chest', 'Upper Body Burn - Biceps and Triceps','Total Body Circuit','Total Body Strenght', 'Yoga Flow', 'Pilates Sculpt', 'HIIT Intensity']
workoutnames.each_with_index do |workoutname, index|
  Workout.create!(workoutname: workoutname, date: Date.today - index.days, duration: rand(30..120), muscle_group_name: ['back', 'chest', 'cardio', 'legs', 'core', 'triceps', 'biceps','glutes','shouldes'].sample, user: User.all.sample)
end

exercise_data = {
  'back' => [
    {name: 'Deadlifts', description: 'Doing deadlifts with a 40kg barbell', duration: 30, repetitions: 8, sets: 4, weight: '40kg'},
    {name: 'Lat Pulldowns', description: 'Performing lat pulldowns', duration: 15, repetitions: 10, sets: 3, weight: '15kg'},
    {name: 'Bent Over Rows', description: 'Performing bent over rows with a 20kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Pull-ups', description: 'Performing 10 pull-ups', duration: 15, repetitions: 10, sets: 3, weight: '0kg'},
    {name: 'Seated Cable Rows', description: 'Performing seated cable rows', duration: 15, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Inverted Rows', description: 'Performing inverted rows', duration: 15, repetitions: 10, sets: 3, weight: '0kg'},
    {name: 'Back Extensions', description: 'Performing back extensions', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Good Mornings', description: 'Performing good mornings with a barbell', duration: 20, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'T-Bar Rows', description: 'Performing T-bar rows', duration: 15, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Dumbbell Pullovers', description: 'Performing dumbbell pullovers', duration: 10, repetitions: 12, sets: 3, weight: '10kg'}
  ],
  'chest' => [
    {name: 'Push-ups', description: 'Performing 15 push-ups', duration: 15, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Bench Press', description: 'Performing bench press with a 40kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '40kg'},
    {name: 'Chest Fly', description: 'Performing chest fly with 8kg dumbbells', duration: 15, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Incline Bench Press', description: 'Performing incline bench press with a 35kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '35kg'},
    {name: 'Dips', description: 'Performing dips for chest', duration: 15, repetitions: 12, sets: 3, weight: '0kg'},
    {name: 'Decline Bench Press', description: 'Performing decline bench press with a 35kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '35kg'},
    {name: 'Chest Press Machine', description: 'Using the chest press machine', duration: 15, repetitions: 12, sets: 3, weight: '30kg'},
    {name: 'Cable Crossover', description: 'Performing cable crossovers', duration: 15, repetitions: 12, sets: 3, weight: '15kg'},
    {name: 'Pec Deck Machine', description: 'Using the pec deck machine', duration: 15, repetitions: 12, sets: 3, weight: '20kg'},
    {name: 'Dumbbell Pullover', description: 'Performing dumbbell pullover', duration: 15, repetitions: 12, sets: 3, weight: '10kg'}
  ],
  'cardio' => [
    {name: 'Running', description: 'Running for 30 minutes', duration: 30, repetitions: 1, sets: 1, weight: '0kg'},
    {name: 'Swimming', description: 'Swimming for 30 minutes', duration: 30, repetitions: 1, sets: 1, weight: '0kg'},
    {name: 'Cycling', description: 'Cycling for 30 minutes', duration: 30, repetitions: 1, sets: 1, weight: '0kg'},
    {name: 'Jumping Jacks', description: 'Performing 50 jumping jacks', duration: 5, repetitions: 50, sets: 3, weight: '0kg'},
    {name: 'Burpees', description: 'Doing 12 burpees', duration: 10, repetitions: 12, sets: 3, weight: '0kg'},
    {name: 'Jump Rope', description: 'Jumping rope for 10 minutes', duration: 10, repetitions: 1, sets: 1, weight: '0kg'},
    {name: 'High Knees', description: 'Doing high knees for 1 minute', duration: 1, repetitions: 1, sets: 3, weight: '0kg'},
    {name: 'Mountain Climbers', description: 'Performing mountain climbers for 1 minute', duration: 1, repetitions: 1, sets: 3, weight: '0kg'},
    {name: 'Tabata Training', description: 'Performing a Tabata workout', duration: 20, repetitions: 1, sets: 1, weight: '0kg'},
    {name: 'Rowing', description: 'Rowing for 15 minutes', duration: 15, repetitions: 1, sets: 1, weight: '0kg'}
  ],
  'legs' => [
    {name: 'Squats', description: 'Doing 20 squats', duration: 15, repetitions: 20, sets: 3, weight: '0kg'},
    {name: 'Lunges', description: 'Doing 15 lunges on each leg', duration: 15, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Leg Press', description: 'Performing leg press with 100kg', duration: 20, repetitions: 12, sets: 3, weight: '100kg'},
    {name: 'Deadlifts', description: 'Doing deadlifts with a 40kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '40kg'},
    {name: 'Calf Raises', description: 'Performing calf raises', duration: 15, repetitions: 20, sets: 3, weight: '0kg'},
    {name: 'Leg Extensions', description: 'Performing leg extensions on a machine', duration: 15, repetitions: 12, sets: 3, weight: '30kg'},
    {name: 'Hamstring Curls', description: 'Performing hamstring curls on a machine', duration: 15, repetitions: 12, sets: 3, weight: '30kg'},
    {name: 'Step Ups', description: 'Performing step ups on a box', duration: 15, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Glute Bridges', description: 'Performing glute bridges', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Jump Squats', description: 'Performing jump squats', duration: 15, repetitions: 15, sets: 3, weight: '0kg'}
  ],
  'core' => [
    {name: 'Plank', description: 'Holding a plank for 1 minute', duration: 1, repetitions: 1, sets: 3, weight: '0kg'},
    {name: 'Crunches', description: 'Doing 25 crunches', duration: 5, repetitions: 25, sets: 3, weight: '0kg'},
    {name: 'Russian Twists', description: 'Doing 20 Russian twists', duration: 5, repetitions: 20, sets: 3, weight: '0kg'},
    {name: 'Mountain Climbers', description: 'Performing mountain climbers for 1 minute', duration: 1, repetitions: 1, sets: 3, weight: '0kg'},
    {name: 'Hanging Leg Raises', description: 'Performing hanging leg raises', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Ab Wheel Rollout', description: 'Performing ab wheel rollouts', duration: 10, repetitions: 10, sets: 3, weight: '0kg'},
    {name: 'V-Ups', description: 'Performing V-ups', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Bicycle Crunches', description: 'Performing bicycle crunches', duration: 5, repetitions: 20, sets: 3, weight: '0kg'},
    {name: 'Reverse Crunches', description: 'Performing reverse crunches', duration: 5, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Toe Touches', description: 'Performing toe touches', duration: 5, repetitions: 20, sets: 3, weight: '0kg'}
  ],
  'triceps' => [
    {name: 'Tricep Dips', description: 'Performing tricep dips on parallel bars', duration: 15, repetitions: 12, sets: 3, weight: '0kg'},
    {name: 'Tricep Pushdowns', description: 'Performing tricep pushdowns with a cable machine', duration: 10, repetitions: 12, sets: 3, weight: '15kg'},
    {name: 'Close Grip Bench Press', description: 'Performing close grip bench press with a 30kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '30kg'},
    {name: 'Skullcrushers', description: 'Performing skullcrushers with a 15kg barbell', duration: 15, repetitions: 12, sets: 3, weight: '15kg'},
    {name: 'Overhead Tricep Extension', description: 'Performing overhead tricep extension with a 10kg dumbbell', duration: 10, repetitions: 12, sets: 3, weight: '10kg'},
    {name: 'Tricep Kickbacks', description: 'Performing tricep kickbacks with 8kg dumbbells', duration: 10, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Diamond Push-ups', description: 'Performing diamond push-ups', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'French Press', description: 'Performing a French press with a 15kg barbell', duration: 15, repetitions: 10, sets: 3, weight: '15kg'},
    {name: 'Tricep Dips Machine', description: 'Using the tricep dips machine', duration: 15, repetitions: 12, sets: 3, weight: '20kg'},
    {name: 'Tricep Push-ups', description: 'Performing tricep push-ups', duration: 10, repetitions: 15, sets: 3, weight: '0kg'}
  ],
  'biceps' => [
    {name: 'Bicep Curls', description: 'Performing bicep curls with 8kg dumbbells', duration: 10, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Hammer Curls', description: 'Performing hammer curls with 8kg dumbbells', duration: 10, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Preacher Curls', description: 'Performing preacher curls with a 15kg barbell', duration: 15, repetitions: 10, sets: 3, weight: '15kg'},
    {name: 'Concentration Curls', description: 'Performing concentration curls with a 8kg dumbbell', duration: 10, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Cable Curls', description: 'Performing cable curls with a cable machine', duration: 10, repetitions: 12, sets: 3, weight: '15kg'},
    {name: 'Chin-ups', description: 'Performing 8 chin-ups', duration: 10, repetitions: 8, sets: 3, weight: '0kg'},
    {name: 'Barbell Curls', description: 'Performing barbell curls with a 20kg barbell', duration: 15, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Incline Dumbbell Curls', description: 'Performing incline dumbbell curls with 8kg dumbbells', duration: 15, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Zottman Curls', description: 'Performing Zottman curls with 8kg dumbbells', duration: 15, repetitions: 12, sets: 3, weight: '8kg'},
    {name: 'Spider Curls', description: 'Performing spider curls with a 15kg barbell', duration: 15, repetitions: 12, sets: 3, weight: '15kg'}
  ],
  'glutes' => [
    {name: 'Squats', description: 'Doing 20 squats', duration: 15, repetitions: 20, sets: 3, weight: '0kg'},
    {name: 'Glute Bridges', description: 'Performing glute bridges', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Hip Thrusts', description: 'Performing hip thrusts with a 40kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '40kg'},
    {name: 'Lunges', description: 'Doing 15 lunges on each leg', duration: 15, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Donkey Kicks', description: 'Performing donkey kicks', duration: 10, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Deadlifts', description: 'Doing deadlifts with a 40kg barbell', duration: 20, repetitions: 10, sets: 3, weight: '40kg'},
    {name: 'Step Ups', description: 'Performing step ups on a box', duration: 15, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Glute Kickbacks', description: 'Performing glute kickbacks on a machine', duration: 15, repetitions: 15, sets: 3, weight: '20kg'},
    {name: 'Sumo Squats', description: 'Performing sumo squats', duration: 15, repetitions: 15, sets: 3, weight: '0kg'},
    {name: 'Bulgarian Split Squats', description: 'Performing Bulgarian split squats', duration: 15, repetitions: 10, sets: 3, weight: '0kg'}
  ],
  'shoulders' => [
    {name: 'Overhead Press', description: 'Performing overhead press with a 20kg barbell', duration: 15, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Lateral Raises', description: 'Performing lateral raises with 5kg dumbbells', duration: 10, repetitions: 12, sets: 3, weight: '5kg'},
    {name: 'Front Raises', description: 'Performing front raises with 5kg dumbbells', duration: 10, repetitions: 12, sets: 3, weight: '5kg'},
    {name: 'Rear Delt Fly', description: 'Performing rear delt fly with 5kg dumbbells', duration: 10, repetitions: 12, sets: 3, weight: '5kg'},
    {name: 'Shoulder Press', description: 'Performing shoulder press with a 20kg barbell', duration: 15, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Arnold Press', description: 'Performing Arnold press with 10kg dumbbells', duration: 10, repetitions: 10, sets: 3, weight: '10kg'},
    {name: 'Upright Rows', description: 'Performing upright rows with a 20kg barbell', duration: 15, repetitions: 10, sets: 3, weight: '20kg'},
    {name: 'Shrugs', description: 'Performing shrugs with 20kg dumbbells', duration: 10, repetitions: 15, sets: 3, weight: '20kg'},
    {name: 'Face Pulls', description: 'Performing face pulls with a cable machine', duration: 10, repetitions: 12, sets: 3, weight: '15kg'},
    {name: 'Dumbbell Shoulder Press', description: 'Performing dumbbell shoulder press with 10kg dumbbells', duration: 10, repetitions: 10, sets: 3, weight: '10kg'}
  ]
}

exercise_data.each do |muscle, exercises|
    exercises.each do |exercise|
      Exercise.create!(
        exercisename: exercise[:name],
        description: exercise[:description],
        duration: exercise[:duration],
        workout: Workout.all.sample, 
        repetitions: exercise[:repetitions],
        sets: exercise[:sets],
        weight: exercise[:weight]
      )
    end
  end
  

puts "🌱 FINISHED SEEDING!!!!"

