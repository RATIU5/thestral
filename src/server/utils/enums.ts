export enum Collection {
  Pages = "pages",
  Users = "users",
  Widgets = "widgets",
}

export enum Languages {
  Default = "en",
}

export enum ErrorCodes {
  PageNotFound = 1000,
  ParentPageNotFound = 1003,
  PageNotCreated = 1004,
  SlugAlreadyExists = 1101,
  SlugIsEmpty = 1102,
  SlugIsInvalid = 1103,
}
