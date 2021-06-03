export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Inicio',
      root: true,
      svg: './assets/media/svg/icons/Home/Home.svg',
      page: '/admin/home',
    },

    /* Maestros */
    { section: 'Maestros' },
    {
      title: 'Atributos de Plan',
      root: true,
      svg: './assets/media/svg/icons/General/Shield-check.svg',
      page: '/admin/maintainer/plan-attribute',
    },
    {
      title: 'Planes',
      root: true,
      svg: './assets/media/svg/icons/Shopping/Money.svg',
      page: '/admin/maintainer/plan',
    },
    {
      title: 'Operadores',
      root: true,
      svg: './assets/media/svg/icons/Communication/Adress-book2.svg',
      page: '/admin/maintainer/operator',
    },
    {
      title: 'Categorias',
      root: true,
      svg: './assets/media/svg/icons/Layout/Layout-4-blocks.svg',
      page: '/admin/maintainer/category',
    },
    {
      title: 'Marcas',
      root: true,
      svg: './assets/media/svg/icons/Devices/iPhone-X.svg',
      page: '/admin/maintainer/brand',
    },
    {
      title: 'Caracteristicas del Producto',
      root: true,
      svg: './assets/media/svg/icons/General/Shield-check.svg',
      page: '/admin/maintainer/product-characteristic',
    },
    {
      title: 'Variaciones del Producto',
      root: true,
      svg: './assets/media/svg/icons/General/Shield-check.svg',
      page: '/admin/maintainer/product-variation',
    },
    {
      title: 'Productos',
      root: true,
      svg: './assets/media/svg/icons/Shopping/Box3.svg',
      page: '/admin/maintainer/product',
    },

    /* Configuraciones */
    { section: 'Configuraciones' },
    {
      title: 'Generales',
      root: true,
      svg: './assets/media/svg/icons/General/Settings-2.svg',
      page: '/admin/settings/main',
    },
    {
      title: 'Empresas',
      root: true,
      svg: './assets/media/svg/icons/Home/Building.svg',
      page: '/admin/settings/company',
    },
    {
      title: 'Widgets',
      root: true,
      svg: './assets/media/svg/icons/Design/Image.svg',
      page: '/admin/settings/widgets',
    },

    /* Seguridad */
    { section: 'Seguridad' },
    {
      title: 'Usuarios',
      root: true,
      svg: './assets/media/svg/icons/Communication/Shield-user.svg',
      page: '/admin/security/users',
    },
    {
      title: 'Asesores',
      root: true,
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/admin/security/consultants',
    },
    {
      title: 'Logs',
      root: true,
      svg: './assets/media/svg/icons/Shopping/Chart-bar3.svg',
      page: '/admin/security/logs',
    },

  ]
};
