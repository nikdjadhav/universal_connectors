const MinEmailLength = 6;
const MaxEmailLength = 100;

const MinPasswordLength = 8;
const MaxPasswordLength = 32;

const MinNameLength = 1;
const MaxNameLength = 50;

const MaxAttachmentSize = 25 * 1024 * 1024; // 25MB

const MaxPhoneNumberLength = 15;
const MinPhoneNumberLength = 4;

const MaxEstimatedHoursLength = 9; // as we dotn want to allow to enter more than 99999 hours, so 100000:00 is 9 characters which is just greater that 99999:59 which is 8 characters
const MaxHoursLimit = 99999;
const MaxAmountLength = 100000;

const smallInputMinLength = 1;
const smallInputMaxLength = 100;

const bigInpuMaxLength = 2000;
const bigInpuMinLength = 0;

const length10 = 10;

const minSearchLength = 2;

// we have created a enum type for the different epmloyee types in schema.prisma file.
// here we are treating the below values "Contractor", "Employee" as id's in database.
// we are doing this manully (hard coding in UI) as we are saving a api request to DB and backend..
// in future if you want to chnage names of eemployee types then chnage the label of below fields
// if you want to add new employee types thee add it below and make sure to add its id in schema.prisma file also
// types in enum once added cannot be removed so yoou cannot remove below tyypes from DB but add new one
const employeeTypes = [
  { value: "Employee", label: "Employee" },
  { value: "Contractor", label: "Contractor" },
];

// same as above  we have created a enum in Db  for employee type
const genderTypes = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PUBLIC_BUCKET_BASE_URL = process.env.NEXT_PUBLIC_BUCKET_BASE_URL; // for public files

const RQ = {
  user: "user",
  workspace: "workspace",
  allUsers: "allUsers",
  project: "project",
  allProjects: "allProjects",
  task: "task",
  allTasks: "allTasks",
  client: "client",
  allClients: "allClients",
  supervisor: "supervisor",
  allSupervisors: "allSupervisors",
  allPMs: "allPMs",
  department: "department",
  allDepts: "allDepartments",
  attachment: "attachment",
  expense: "expense",
  employee: "employee",
  role: "role",
  allRoles: "allRoles",
  permission: "permission",
  allWorkCals: "allWorkCals",
  workCal: "workCal",
  allPriority: "allPriority",
  allStatus: "allStatus",
  allExpenseStatus: "allExpenseStatus",
  allTimesheets: "allTimesheet",
  allPendingTimesheets: "allPendingTimesheet",
  allApprovedTimesheets: "allApprovedTimesheet",
  allRejectedTimesheets: "allRejectedTimesheet",
  allPendindDayStartReports: "allPendindDayStartReport",
  allApprovedDayStartReports: "allApprovedDayStartReport",
  allRejectedDayStartReports: "allRejectedDayStartReport",
  allPendingExpenses: "allPendingExpenses",
  allApprovedExpenses: "allApprovedExpenses",
  allRejectedExpenses: "allRejectedExpenses",
  timesheet: "timesheet",
  allDayStartReport: "allDayStartReport",
  dayStartReport: "dayStartReport",
  allExpenseCategories: "allExpenseCategories",
  expenseCategory: "expenseCategory",
  expense: "expense",
  allExpenses: "allExpenses",
  currencyCode: "currencyCode",
  allCurrencyCode: "allCurrencyCode",
  allCurriencies: "allCurriencies",
  allProjectList: "allProjectList",
  allTaskList: "allTaskList",
  allClientList: "allClientList",
  allUsersList: "allUsersList",
  allRolesList: "allRolesList",
  allPriorityList: "allPriorityList",
  allStatusList: "allStatusList",
  allCurrenciesList: "allCurrenciesList",
};

const dropZone = {
  maxFiles: 10,
  maxFileSize: 25 * 1024 * 1024, // 25MB
  maxFileSizeMb: 25,
};

const roleRestrictionLabels = {
  own: "Own",
  none: "None",
  subordinates: "Subordinates",
};

const permissionAccessLabels = {
  view: "View",
  create: "Create",
  edit: "Edit",
  all: "All",
};

const modes = {
  create: "create",
  view: "view",
  edit: "edit",
};

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "not started", label: "Not Started" },
  { value: "incomplete", label: "Incomplete" },
  { value: "compeleted", label: "Completed" },
  { value: "halted", label: "Halted" },
  { value: "closed", label: "Closed" },
  { value: "cancled", label: "Cancled" },
];

const expenseStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "unpending", label: "Unpending" },
  { value: "approved", label: "Approved" },
  { value: "unapproved", label: "Unapproved" },
];

const sourceName = [
  {
    value: "netSuite",
    label: "NetSuite",
    
  },
  {
    value: "quickBooks",
    label: "QuickBooks",
  },
  {
    value: "xero",
    label: "Xero",
  }
];

const destinationName = [
  {
    value: "googleSheets",
    label: "Google Sheets",
  },
  {
    value: "microsoftExcel",
    label: "Microsoft Excel",
  },
  {
    value: "microsoftOneDrive",
    label: "Microsoft OneDrive",
  }
];

const editValue = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "value",
    label: "Value",
  }
];

const netsuiteValues = [
  {
    value: "internalId",
    label: "Internal Id",
  },
  {
    value: "externalId",
    label: "External Id",
  }
]

// we take maxTake as 100 from database for all queries, but here I have set it to 99 to be safe from any future changes
const maxDataLengthForUISearch = 99;

// I have made debounce time 500 intentionally, to reduce database calls if happenned in a short time
// later if you have more database and backend resources then you can reduce this time
const backendDebounceTime = 500;

//made UI debounce time 200ms, as we are searchi on UI and no api calls, so search feels faster
const UIDebounceTime = 200;

const environment = process.env.NODE_ENV;



export {
  MinEmailLength,
  MaxEmailLength,
  MinPasswordLength,
  MaxPasswordLength,
  MinNameLength,
  MaxNameLength,
  MaxAttachmentSize,
  MaxPhoneNumberLength,
  MinPhoneNumberLength,
  bigInpuMaxLength,
  bigInpuMinLength,
  employeeTypes,
  genderTypes,
  MaxEstimatedHoursLength,
  MaxHoursLimit,
  MaxAmountLength,
  smallInputMinLength,
  smallInputMaxLength,
  API_BASE_URL,
  RQ,
  length10,
  dropZone,
  roleRestrictionLabels,
  permissionAccessLabels,
  modes,
  PUBLIC_BUCKET_BASE_URL,
  statusOptions,
  expenseStatusOptions,
  maxDataLengthForUISearch,
  backendDebounceTime,
  UIDebounceTime,
  environment,
  minSearchLength,
  sourceName,
  destinationName,
  editValue,
  netsuiteValues
};
