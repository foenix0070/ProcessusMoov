//
// Place any custom JS here
//

const steps = document.querySelectorAll('.step');
const content = document.querySelector('.content');

steps.forEach((step, index) => {
    step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');

        loadStepContent(index);
    });
});

function loadStepContent(stepIndex) {
    let stepContent = '';

    switch (stepIndex) {
        case 0:
            stepContent = "Toutes mes demande";
            break;
        case 1:
            stepContent = "En cours";
            break;
        case 2:
            stepContent = "Modifiées";
            break;
        case 3:
            stepContent = "Approuvées";
            break;
        case 4:
            stepContent = "Rejetées";
            break;
        default:
            stepContent = "";
    }

    content.textContent = stepContent;
}
