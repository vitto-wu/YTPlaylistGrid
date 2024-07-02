document.addEventListener('DOMContentLoaded', function() {
    const applyGridButton = document.getElementById('applyGrid');
    applyGridButton.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
  