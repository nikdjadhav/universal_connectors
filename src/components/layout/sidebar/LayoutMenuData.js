// import { permissionTypeIds } from "../../../../DBConstants";

export default sidebarOptions;

function sidebarOptions(user) {
  const role = user?.role;
  if (!user || !role) return [];

  const menuItemsAdmin = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
    },
    {
      id: "day-start-report",
      label: "Day Start Report",
      icon: "ri-home-smile-2-line",
      link: "/day-start-report",
    },
    {
      id: "timesheet",
      label: "Timesheet",
      icon: "ri-calendar-line",
      link: "/timesheet",
    },
    {
      id: "resource-allocation",
      label: "Resource Allocation",
      icon: "ri-open-source-line",
      link: "/resource-allocation",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "ri-folder-open-line",
      link: "/projects",
    },
    {
      id: "tasks",
      label: "Tasks",
      icon: "ri-task-line",
      link: "/tasks",
    },
    ,
    {
      id: "clients",
      label: "Clients",
      icon: "ri-briefcase-line",
      link: "/clients",
    },
    {
      id: "pending-approvals",
      label: "Pending Approvals",
      icon: "ri-folder-transfer-line",
      link: "/pending-approvals",
    },
    {
      id: "expense",
      label: "Expense",
      icon: "ri-currency-line",
      link: "/expense",
    },
    {
      id: "users",
      label: "Users",
      icon: "ri-user-line",
      link: "/users",
    },
    {
      id: "reports",
      label: "Reports",
      icon: "ri-file-chart-line",
      link: "/reports",
    },
    {
      id: "teams",
      label: "Teams",
      icon: "ri-group-line",
      link: "/teams",
    },
    {
      id: "roles",
      label: "Roles",
      icon: "ri-shield-user-line",
      link: "/roles",
    },

    {
      id: "expense-categories",
      label: "Expense Categories",
      icon: "ri-file-text-line",
      link: "/expense-categories",
    },
    // {
    //   id: "departments",
    //   label: "Departments",
    //   icon: "ri-building-4-line",
    //   link: "/departments",
    // },
    {
      id: "currency",
      label: "Currency",
      icon: "ri-money-dollar-circle-line",
      link: "/currency",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "ri-settings-4-line",
      link: "/settings",
    },
  ];

  if (role.isAdmin) return menuItemsAdmin;

  const menuItemsForAll = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
    },
    {
      id: "day-start-report",
      label: "Day Start Report",
      icon: "ri-home-smile-2-line",
      link: "/day-start-report",
    },
    {
      id: "timesheet",
      label: "Timesheet",
      icon: "ri-calendar-line",
      link: "/timesheet",
    },
  ];

  if (!role.permissions) {
    const data = [...menuItemsForAll];
    data.push({
      id: "expense",
      label: "Expense",
      icon: "ri-currency-line",
      link: "/expense",
    });
    data.push({
      id: "teams",
      label: "Teams",
      icon: "ri-group-line",
      link: "/teams",
    });
    return data;
  }

  if (user.canBePM) {
    menuItemsForAll.push({
      id: "resource-allocation",
      label: "Resource Allocation",
      icon: "ri-open-source-line",
      link: "/resource-allocation",
    });
  }

  if (role.permissions[permissionTypeIds.projects]) {
    menuItemsForAll.push({
      id: "projects",
      label: "Projects",
      icon: "ri-folder-open-line",
      link: "/projects",
    });
  }

  if (role.permissions[permissionTypeIds.tasks]) {
    menuItemsForAll.push({
      id: "tasks",
      label: "Tasks",
      icon: "ri-task-line",
      link: "/tasks",
    });
  }

  if (role.permissions[permissionTypeIds.clients]) {
    menuItemsForAll.push({
      id: "clients",
      label: "Clients",
      icon: "ri-briefcase-line",
      link: "/clients",
    });
  }

  if (user.canBePM || user.canBeSupervisor) {
    menuItemsForAll.push({
      id: "pending-approvals",
      label: "Pending Approvals",
      icon: "ri-folder-transfer-line",
      link: "/pending-approvals",
    });
  }

  menuItemsForAll.push({
    id: "expense",
    label: "Expense",
    icon: "ri-currency-line",
    link: "/expense",
  });

  if (role.permissions[permissionTypeIds.users]) {
    menuItemsForAll.push({
      id: "users",
      label: "Users",
      icon: "ri-user-line",
      link: "/users",
    });
  }

  if (role.permissions[permissionTypeIds.reports]) {
    menuItemsForAll.push({
      id: "reports",
      label: "Reports",
      icon: "ri-file-chart-line",
      link: "/reports",
    });
  }

  menuItemsForAll.push({
    id: "teams",
    label: "Teams",
    icon: "ri-group-line",
    link: "/teams",
  });

  if (role.permissions[permissionTypeIds.roles]) {
    menuItemsForAll.push({
      id: "roles",
      label: "Roles",
      icon: "ri-shield-user-line",
      link: "/roles",
    });
  }

  return menuItemsForAll;
}
