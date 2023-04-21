function sidebarOptions() {
  const menuItemsForAll = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: "",
      link: "/integrations",
    },
    {
      id: "fieldMapping",
      label: "Record / Field Mapping",
      icon: "",
      link: "/fieldMapping",
    },
    {
      id: "schedule",
      label: "Sync Frequency",
      icon: "",
      link: "/schedule",
    },
    {
      id: "logs",
      label: "Logs",
      icon: "",
      link: "/logs",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "",
      link: "/settings",
    },
  ];
  return menuItemsForAll;
}

export default sidebarOptions;
