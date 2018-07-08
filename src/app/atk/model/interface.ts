
export enum Type_Of_Account {
  user = 'u',
  CreatorContent = 'cc',
  CreatorManager = 'ccm',
  Admin = 'admin',
  visitor = 'visitor',
  all = 'all'
}

export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  fullName?: string;
  password?: string;
  email?: string;
  type_of_account?: Type_Of_Account;
  social_id?: number;
  user_name?: string;
  creation_date?: Date;
  stripe_customer_id?: number;
  player_id?: string;
  avatar?: string;
  city?: string;
  country?: string;
  createdAt?: number;
  level?: number;
  line1?: number;
  postal_code?: number;
  profile_description?: string;
  profile_picture?: string;
  state?: string;
  trophy?: number;
  updatedAt?: number;
  xp?: number;

  firstname?: string;
  lastname?: string;
  username?: string;
  postalcode?: number;
  description?: string;
  userPhoto?: string;
}
export interface UserProfile {
  userPhoto?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  descritption?: string;
  city?: string;
  country?: string;
  line1?: string;
  state?: string;
  postalode?: number;

  email?: string;
  postal_code?: number;
  password?: string;
  password2?: string;
}

export interface Event {
  id?: number;
  event_name?: number;
  eventName?: number;
  event_value?: number;
  eventValue?: number;
  createdAt?: Date;
  event_active?: boolean;
  event_frequency_times?: number;
  event_frequency_unit?: number;
  updatedAt?: Date;
}

export interface Level {
  id?: number;
  level_value?: number;
  xp_value?: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface XpObject {
  currentXP?: number;
  nextLevelXP?: number;
  currentLevel?: number;
  completedEvents?: Event[];
}

export interface UserLogin {
  success?: boolean;
  token?: string;
  user: User;
  xpObject?: XpObject;
}

export interface Post {
  postid?: number;
  comment?: string;
}

export interface Tier {
  id?: number;
  tierid?: number;
  cc_id?: number;
  plan_id?: string;
  tier_name?: string;
  tier_value?: number;
  tiername?: string;
  tiervalue?: number;
  tier_rewards?: any;
  rewards?: any;
  issubscribed?: boolean;
}

export interface Orders {
  id?: number;
  order_id?: number;
  create_date?: Date;
  payment_status?: string;
  cc_id?: number;
  user?: string;
  post_id?: string;
  price?: number;
  tracking_number?: number;

  cc_first_name?: string;
  cc_last_name?: string;
  user_first_name?: number;
  user_id?: number;
  user_last_name?: string;

  // ui

  content_link?: string;
  order_date?: Date;
  payment_date?: Date;
  shipping_date?: Date;
  shipping_status?: string;
  shipping_adddress?: string;
  poster_size?: string;
  billing_address?: string;
  poster_signed?: string;

  ///

  city?: string;
  country?: string;
  line1?: string;
  postal_code?: number;
  size?: string;
  signed?: boolean;
  email?: string;
  img?: string;
  name?: string;
  sku_id?: string;
  state?: string;
  phone?: number;
  stripeCardToken?: Card_Token;
}

export enum Card_Token {
  visa = 'tok_visa'

}

export interface UserOrderVm {
  id?: number;
  cc_id?: number;
  user_id?: number;
  content_link?: string;
  order_date?: Date;
  payment_date?: Date;
  shipping_date?: Date;
  shipping_status?: Shipping_Status;
  tracking_number?: number;
  shipping_adddress?: string;
  billing_address?: string;
  price?: number;
  poster_size?: string;
  poster_signed?: boolean;
  payment_status?: Payment_Status;
}

export enum Payment_Status {
  paid = 'paid'
}

export enum Shipping_Status {
}

export enum Post_Data_Type {
  Images = 'image',
  Text = 'text',
  Video = 'video'
}

export interface Content {
  id?: number;
  created_time?: Date;
  images?: string;
  userid?: number;
  post_data_type?: Post_Data_Type;
  video_url?: string;
  for_sale?: boolean;
  description?: string;
  avatar?: string;
  username?: string;
  tier_id?: number;
  tier_value?: number;
  isliked?: boolean;
  commentscount?: number;
  likescount?: number;
  is_subscribed?: boolean;

  isAddComment?: boolean;
  hasComment?: boolean;
  comments?: Comments[];
  tier_name?:string;
  // 
}

export interface PostContent {
  postid?: number;
  post_data_type?: Post_Data_Type;
  userPhoto?: any;
  uploadedFrom?: string;
  description?: string;
  tierid?: number;
  forsale?: boolean;
  creators?: any[];

}

export enum Product_Type {
  poster = 'poster'
}
export interface Sku {
  id?: number;
  product_type?: Product_Type;
  size?: string;
  is_signed?: boolean;
  price?: number;
  createdAt?: Date;
  cc_id?: number;
}

export interface SkuPurchase {
  cc_id?: number;
  img?: string;
  sku_id?: string;
  price?: number;
  email?: string;
  size?: string;
  signed?: boolean;
  phone?: number;
  name?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: number;
  line1?: string;
}

export interface ContentCreator {
  userID?: number;
  profilePicture?: string;
  fullName?: string;
  email?: string;
  level?: number;
  xP?: number;
  numOfTiers?: number;
  numOfPosts?: number;
}


// export interface Association {
//   id?: number;
//   association_id?:number;
//   cc_id?: number;
//   cc_users?: User;

//   ccm_id?: number;
//   ccm_users?: User;

//   // cc_name?: string;
//   // ccm_name?: string;
//   privileges?: Privilege;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface Privilege {
  id?: number;


  cc_id?: number;
  cc_users?: User;
  ccm_id?: number;
  ccm_users?: User;

  posts?: number;
  likes?: number;
  comments?: number;
  block_users?: number;
  chat_messages?: number;
  get_subscribers?: number;
  orders?: number;
  reports?: number;
  skus?: number;
  tiers?: number;
  privileges?: Privilege;
  admin_id?: number;
  association_id?: number;
  created_by: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum Privilege_type {
  NONE = 0
  , READ = 1
  , UPDATE = 2
  , CREATE = 3
  , DELETE = 4
}
export enum Privilege_Key {
  posts = 'posts',
  likes = 'likes',
  comments = 'comments',
  block_users = 'block_users',
  chat_messages = 'chat_messages',
  get_subscribers = 'get_subscribers',
  orders = 'orders',
  reports = 'reports',
  skus = 'skus',
  tiers = 'tiers',
}
export interface Likes {
  id?: number;
  liked_date?: Date;
  post_id?: number;
  user_id?: number;
}

export interface Comments {
  id?: number;
  comment?: number;
  created_at?: Date;
  post_id?: number;
  user_id?: number;
}

export interface Subscribtions {
  id?: number;
  cc_id?: number;
  is_blocked?: boolean;
  payment_status?: number;
  price?: number;
  stripe_sub_id?: number;
  tier_id?: number;
  user_id?: number;
  renew_date?: Date;
  end_date?: Date;
  creation_date?: Date;
  cc_first_name?: string;
  cc_last_name?: string;
  subscription_value?: number;
  user_first_name?: string;
  user_last_name?: string;
}

export interface Subscriber {
  cc_id?: number;
  creation_date?: Date;
  end_date?: Date;
  first_name?: string;
  id?: number;
  last_name?: string;
  profile_picture?: string;
  renew_date?: Date;
  tier_name?: string;
  tier_value?: number;
  user_name?: string;
}

export interface UserContacts {
  id?: number;
  is_blocked?: boolean;
  is_blocking_me?: boolean;
  profile_picture?: string;
  user_name?: string;
  // for chat
  u_id?: number;
  _id?: number;
  u_name?: string;
  name?: string;
  type?: string;
}

export interface UserMessage {
  createdAt?: number;
  message_id?: number;
  receiver_id?: number;
  text?: string;
  user?: UserContacts;
  _id?: number;
  type?: string;

}

export interface profileComment {
  comment?: number;
  commenter_id?: number;
  created_at?: Date;
  id?: number;
  updatedAt?: Date;
  user_id?: number;
}

export interface ScreenShot {
  id?: number;
  user_id?: number;
  file_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Streams {
  comments?: Comments[];
  likes?: Likes[];
  subscribtions?: Subscribtions[];
}


export enum User_Session_Keys {
  Association = 'associaion',
  Managed_User = 'managedUser',
  Managed_User_Change = 'managedUserChange'
}

export interface SearchModel {
  cc?: number;
  type?: string;
  dateRangeType?: string;
  startDate?: Date;
  yearFrom?: number;
  endDate?: any;
  yearTo?: number;
  page?: number;
  length?: number;
  startMonth?: number;
  endMonth?: number;
}


export interface SupportTicket {
  id?: number;
  contentCreator_data?: ContentCreator;
  sender?: Number;
  sender_data?: User;
  message?: string;
  reason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ChartMatrix {
  name: string,
  series: [
    {
      name: any;
      value: number;
    }
  ]
}








