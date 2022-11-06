const opcionesAdmin = [
    { nombre: "Acerca de", icono: "bi bi-grid", ruta: "/dashboard/about", hijos: [], },
    { nombre: "Perfiles", icono: "bi bi-clipboard-data", ruta: "", hijos: [
        { nombre: "Listado", icono: "bi bi-circle", ruta: "/dashboard/listprofiles", },
        { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/dashboard/addprofile" },
        { nombre: "Administración", icono: "bi bi-circle", ruta: "/dashboard/admprofile", },
      ]
    },
    { nombre: "Usuarios", icono: "bi bi-person-lines-fill", ruta: "", hijos: [
      { nombre: "Listado", icono: "bi bi-circle", ruta: "/dashboard/admuser", },
      { nombre: "Nuevo", icono: "bi bi-circle", ruta: "/dashboard/admuser" },
      { nombre: "Administración", icono: "bi bi-circle", ruta: "/dashboard/admuser", },
      ]
    }
  ];
  
  
  // *********************************************************************************
  
  
  const opcionesInvitado = [
    { nombre: "Acerca de", icono: "bi bi-grid", ruta: "/dashboard/about", hijos: [], },
    { nombre: "Compras", icono: "bi bi-clipboard-data", ruta: "", hijos: [
        { nombre: "Pendientes", icono: "bi bi-circle", ruta: "/dashboard/admuser", },
        { nombre: "Productos", icono: "bi bi-circle", ruta: "/dashboard/admuser" },
        { nombre: "Antiguas", icono: "bi bi-circle", ruta: "/dashboard/admuser", }
      ]
    }
  ];
  
  export { opcionesAdmin, opcionesInvitado };