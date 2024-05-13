export enum Table {
  Pages = "pages",
  Users = "users",
  Widgets = "widgets",
}

export enum Languages {
  Default = "en",
  DefaultName = "English",
}

export enum ErrorCodes {
  PageNotFound = 1000,
  ParentPageNotFound = 1003,
  PageNotCreated = 1004,
  SlugAlreadyExists = 1101,
  SlugIsEmpty = 1102,
  SlugIsInvalid = 1103,
}
