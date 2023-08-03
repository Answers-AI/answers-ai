interface ChatApp {
  id: number;
  apiKey: string;
  name: string;
  organizationId: string;
  organization: Organization;
  userId: string;
  user: User;
}

interface User {
  id: string;
  role: string;
  name: string;
  email: string;
  emailVerified: Date;
  invited: Date;
  image: string;
  accounts: Account;
  sessions: Session;
  currentOrganization: Organization;
  organizations: Organization;
  appSettings: any;
  chats: Chat;
  chatsCreated: Chat;
  messages: Message;
  prompts: Prompt;
  journeys: Journey;
  feedbacks: MessageFeedback;
  createdAt: Date;
  updatedAt: Date;
  ChatApp: ChatApp;
  organizationId: string;
  apiKeys: ApiKey;
  aiRequests: AiRequest;
  favoritedSidekicks: Sidekick;
  Sidekick: Sidekick;
  contextFields: ContextField;
}

interface ApiKey {
  id: string;
  userId: string;
  organizationId: string;
  type: ApiKeyType;
  user: User;
  organization: Organization;
  key: string;
}

interface Organization {
  id: string;
  name: string;
  image: string;
  users: User;
  usersSelected: User;
  documentPermissions: DocumentPermission;
  createdAt: Date;
  updatedAt: Date;
  ChatApp: ChatApp;
  contextFields: ContextField;
  journeys: Journey;
  chats: Chat;
  appSettings: any;
  apiKeys: ApiKey;
}

interface ContextField {
  id: string;
  fieldId: string;
  helpText: string;
  fieldType: string;
  fieldTextValue: string;
  organizationId: string;
  organization: Organization;
  User: User;
  userId: string;
}

interface Sidekick {
  id: string;
  isGlobal: boolean;
  isSystem: boolean;
  isSharedWithOrg: boolean;
  isFavoriteByDefault: boolean;
  tags: string;
  label: string;
  placeholder: string;
  temperature: number;
  frequency: number;
  presence: number;
  maxCompletionTokens: number;
  aiModel: string;
  systemPromptTemplate: string;
  userPromptTemplate: string;
  contextStringRender: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUser: User;
  userId: string;
  favoritedBy: User;
}

interface WebDocument {
  id: string;
  url: string;
  domain: string;
  content: string;
  pageTitle: string;
  pageLastUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  source: string;
  title: string;
  domain: string;
  url: string;
  content: string;
  metadata: any;
}

interface DocumentPermission {
  id: string;
  document: Document;
  documentId: string;
  organization: Organization;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
  state: string;
  ok: boolean;
  user: User;
}

interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

interface Chat {
  id: string;
  title: string;
  prompt: Prompt;
  promptId: string;
  journey: Journey;
  journeyId: string;
  owner: User;
  ownerId: string;
  users: User;
  messages: Message;
  organizationId: string;
  organization: Organization;
  filters: any;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Journey {
  id: string;
  title: string;
  goal: string;
  filters: any;
  organizationId: string;
  organization: Organization;
  chats: Chat;
  users: User;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  chat: Chat;
  usages: number;
  likes: number;
  dislikes: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  answers: Message;
  users: User;
  tags: string;
}

interface Message {
  id: string;
  role: string;
  content: string;
  contextSourceFilesUsed: string;
  context: string;
  contextDocuments: Document;
  sidekickJson: any;
}

interface MessageFeedback {
  id: string;
  rating: Rating;
  content: string;
  tags: string;
  user: User;
  userId: string;
  message: Message;
  messageId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppSettings {
  id: string;
  services: AppService;
  jiraSettings: JiraSettings;
  jiraSettingsId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppService {
  id: string;
  name: string;
  enabled: boolean;
  AppSettings: AppSettings;
  appSettingsId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface JiraSettings {
  id: string;
  projects: JiraProjectSetting;
  AppSettings: AppSettings;
  createdAt: Date;
  updatedAt: Date;
}

interface JiraProjectSetting {
  id: string;
  key: string;
  enabled: boolean;
  JiraSettings: JiraSettings;
  jiraSettingsId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AiRequest {
  id: string;
  type: string;
  method: string;
  model: string;
  tokensUsed: number;
  tokensUsedUser: number;
  costUsdTotal: number;
  costUsdTotalUser: number;
  user: User;
  userId: string;
  message: Message;
  request: any;
  createdAt: Date;
  updatedAt: Date;
}

enum ApiKeyType {
  USER = 'USER',
  ORGANIZATION = 'ORGANIZATION',
}

enum Rating {
  thumbsUp = 'thumbsUp',
  thumbsDown = 'thumbsDown',
}

