const themeToggler = document.getElementById('theme-toggler');

const toogleTheme = () =>
{
    const isDarkMode = document.body.classList.contains('dark-mode');

    if (isDarkMode)
    {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
    else
    {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
};

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark')
{
    document.body.classList.add('dark-mode');
}
else
{
    document.body.classList.remove('dark-mode');
}

themeToggler.addEventListener('click', toogleTheme);