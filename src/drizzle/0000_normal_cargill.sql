CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "case_specs" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_factor_mini_itx" boolean,
	"form_factor_flex_atx" boolean,
	"form_factor_mini_atx" boolean,
	"form_factor_micro_atx" boolean,
	"form_factor_atx" boolean,
	"form_factor_e_atx" boolean,
	"form_factor_xl_atx" boolean,
	"front_io_power" boolean,
	"front_io_reset" boolean,
	"front_io_usb_2_0" boolean,
	"front_io_usb_3_2_gen1a" boolean,
	"front_io_usb_3_2_gen2a" boolean,
	"front_io_usb_3_2_gen2x2a" boolean,
	"front_io_usb_3_2_gen2c" boolean,
	"front_io_usb_4_20gb_type_c" boolean,
	"front_io_usb_4_40gb_type_c" boolean,
	"front_io_audio_jack" boolean,
	"dimensions_length_mm" integer,
	"dimensions_width_mm" integer,
	"dimensions_height_mm" integer,
	"fan_capacity_120mm" boolean,
	"fan_capacity_140mm" boolean,
	"water_cooling_front" boolean,
	"water_cooling_top" boolean,
	"water_cooling_bottom" boolean,
	"water_cooling_rear" boolean,
	"housing_material_plastic" boolean,
	"housing_material_metal" boolean,
	"housing_material_side_panel" text NOT NULL,
	"housing_material_front_panel" text NOT NULL,
	"psu_placement_top" boolean,
	"psu_placement_bottom" boolean,
	"cable_routing_yes" boolean,
	"cable_routing_no" boolean,
	"storage_options_hdd_35" boolean,
	"storage_options_ssd_25" boolean,
	"max_cooler_height_mm" integer,
	"max_gpu_size_length_mm" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intel_cpu" (
	"id" serial PRIMARY KEY NOT NULL,
	"processor" varchar(255),
	"model" varchar(255),
	"code_name" varchar(255),
	"generation" integer,
	"performance_cores" integer,
	"efficient_cores" integer,
	"threads" integer,
	"base_clock_performance_core" numeric,
	"turbo_clock_performance_core" numeric,
	"turbo_clock_efficient_core" numeric,
	"base_clock_efficient_core" numeric,
	"gpu" varchar(255),
	"max_clock_rate_ghz" numeric,
	"l2_cache" varchar(255),
	"smart_cache" varchar(255),
	"base_tdp_w" integer,
	"turbo_tdp_w" integer,
	"socket" varchar(255),
	"launch_date" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"product_name" text NOT NULL,
	"description" text NOT NULL,
	"short_description" text NOT NULL,
	"quantity" text NOT NULL,
	"price" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text,
	"emailVerified" timestamp,
	"image" text,
	"isAdmin" integer DEFAULT 0,
	"isModerator" integer DEFAULT 0,
	"role" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
