document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goalDeficit = parseFloat(document.getElementById('goal').value);

    // 1. Calculate BMI
    // BMI = weight(kg) / (height(m)^2)
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // 2. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 3. Calculate TDEE
    const tdee = bmr * activity;

    // 4. Goal Calories
    const targetCalories = tdee - goalDeficit;

    // Display Results
    displayResults(bmi, bmr, tdee, targetCalories, goalDeficit);
});

function displayResults(bmi, bmr, tdee, target, deficit) {
    const resultsCard = document.getElementById('results');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmrValue = document.getElementById('bmrValue');
    const tdeeValue = document.getElementById('tdeeValue');
    const targetValue = document.getElementById('targetValue');
    const goalDescription = document.getElementById('goalDescription');

    bmiValue.textContent = bmi.toFixed(1);
    bmrValue.textContent = Math.round(bmr) + ' kcal';
    tdeeValue.textContent = Math.round(tdee) + ' kcal';
    targetValue.textContent = Math.round(target) + ' kcal';

    // Update goal description
    if (deficit === 0) {
        goalDescription.textContent = "Maintenance (100% of TDEE)";
    } else if (deficit === 250) {
        goalDescription.textContent = "Mild loss (~0.25 kg/week, -10%)";
    } else if (deficit === 500) {
        goalDescription.textContent = "Weight loss (~0.5 kg/week, -20%)";
    } else if (deficit === 1000) {
        goalDescription.textContent = "Extreme loss (~1.0 kg/week, -40%)";
    }

    // Set BMI Category and Class
    let category = '';
    let categoryClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'bmi-warning';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal';
        categoryClass = 'bmi-normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryClass = 'bmi-warning';
    } else {
        category = 'Obese';
        categoryClass = 'bmi-danger';
    }

    bmiCategory.textContent = category;
    bmiCategory.className = 'bmi-badge ' + categoryClass;

    // Show results with animation
    resultsCard.style.display = 'block';
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
