import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  boolean,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').unique().notNull(),
  password: text('password'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  isAdmin: integer('isAdmin').default(0), // Ensure this field exists in your schema
  role: text('role'), // New field for role
});

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // Foreign key reference to User
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }), // Foreign key reference to User
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(), // Reference to the user
  product_name: text("product_name").notNull(),
  description: text("description").notNull(),
  short_description: text("short_description").notNull(),
  quantity: text("quantity").notNull(),
  price: text("price").notNull(),
  image_url: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const caseSpecs = pgTable('case_specs', {
  id: serial('id').primaryKey(),
  // Form Factors
  formFactorMiniItx: boolean('form_factor_mini_itx'),
  formFactorFlexAtx: boolean('form_factor_flex_atx'),
  formFactorMiniAtx: boolean('form_factor_mini_atx'),
  formFactorMicroAtx: boolean('form_factor_micro_atx'),
  formFactorAtx: boolean('form_factor_atx'),
  formFactorEAtx: boolean('form_factor_e_atx'),
  formFactorXlAtx: boolean('form_factor_xl_atx'),
  // Front I/O Ports
  frontIoPower: boolean('front_io_power'),
  frontIoReset: boolean('front_io_reset'),
  frontIoUsb2_0: boolean('front_io_usb_2_0'),
  frontIoUsb3_2Gen1a: boolean('front_io_usb_3_2_gen1a'),
  frontIoUsb3_2Gen2a: boolean('front_io_usb_3_2_gen2a'),
  frontIoUsb3_2Gen2x2a: boolean('front_io_usb_3_2_gen2x2a'),
  frontIoUsb3_2Gen2c: boolean('front_io_usb_3_2_gen2c'),
  frontIoUsb4_20gbTypeC: boolean('front_io_usb_4_20gb_type_c'),
  frontIoUsb4_40gbTypeC: boolean('front_io_usb_4_40gb_type_c'),
  frontIoAudioJack: boolean('front_io_audio_jack'),
  // Dimensions
  dimensionsLengthMm: integer('dimensions_length_mm'),
  dimensionsWidthMm: integer('dimensions_width_mm'),
  dimensionsHeightMm: integer('dimensions_height_mm'),
  // Fan Capacity
  fanCapacity120mm: boolean('fan_capacity_120mm'),
  fanCapacity140mm: boolean('fan_capacity_140mm'),
  // Water Cooling Mounts
  waterCoolingFront: boolean('water_cooling_front'),
  waterCoolingTop: boolean('water_cooling_top'),
  waterCoolingBottom: boolean('water_cooling_bottom'),
  waterCoolingRear: boolean('water_cooling_rear'),
  // Housing Material
  housingMaterialPlastic: boolean('housing_material_plastic'),
  housingMaterialMetal: boolean('housing_material_metal'),
  housingMaterialSidePanel: varchar('housing_material_side_panel', [255]), 
  housingMaterialFrontPanel: varchar('housing_material_front_panel', [255]), 
  // PSU Placement
  psuPlacementTop: boolean('psu_placement_top'),
  psuPlacementBottom: boolean('psu_placement_bottom'),
  // Cable Routing
  cableRoutingYes: boolean('cable_routing_yes'),
  cableRoutingNo: boolean('cable_routing_no'),
  // Storage Options
  storageOptionsHdd35: boolean('storage_options_hdd_35'),
  storageOptionsSsd25: boolean('storage_options_ssd_25'),
  // Cooler and GPU Size
  maxCoolerHeightMm: integer('max_cooler_height_mm'),
  maxGpuSizeLengthMm: integer('max_gpu_size_length_mm'),
});
