document.addEventListener('DOMContentLoaded', function () {
    function toggleModeDark() {
        const html = document.documentElement;

        html.classList.remove('light');
        html.classList.add('dark');
    }

    function toggleModeLight() {
        const html = document.documentElement;

        html.classList.remove('dark');
        html.classList.add('light');
    }

    document.getElementById('switchLight').addEventListener('click', toggleModeDark);
    document.getElementById('switchDark').addEventListener('click', toggleModeLight);
});