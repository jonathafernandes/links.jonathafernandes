document.addEventListener('DOMContentLoaded', function () {
    function toggleMode() {
        const html = document.documentElement;

        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
        } else {
            html.classList.remove('light');
            html.classList.add('dark');
        }
    }

    document.getElementById('switch').addEventListener('click', toggleMode);
});
