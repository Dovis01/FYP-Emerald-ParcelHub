create table setu_fyp.t_00_admin
(
    admin_id    int auto_increment
        primary key,
    admin_name  varchar(32)                          null,
    password    varchar(32)                          null,
    create_time datetime   default CURRENT_TIMESTAMP null,
    update_time datetime                             null,
    status      tinyint(1) default 1                 null,
    constraint admin_admin_id_uindex
        unique (admin_id),
    constraint admin_admin_name_uindex
        unique (admin_name)
)
    comment 'system admin user' auto_increment = 2008813572;

create table setu_fyp.t_11_registered_account
(
    account_id    int auto_increment
        primary key,
    username      varchar(32)                          null,
    email         varchar(32)                          null,
    password      varchar(64)                          not null,
    register_time datetime   default CURRENT_TIMESTAMP not null,
    update_time   datetime                             null,
    status        tinyint(1) default 1                 null,
    constraint registeredaccount_account_id_uindex
        unique (account_id),
    constraint registeredaccount_email_uindex
        unique (email),
    constraint registeredaccount_username_uindex
        unique (username)
)
    auto_increment = 2078;

create table setu_fyp.t_22_ecommerce_website
(
    ecommerce_website_id int auto_increment
        primary key,
    website_name         varchar(64)  null,
    url                  varchar(128) null,
    constraint esales_website_esales_id_uindex
        unique (ecommerce_website_id),
    constraint t_22_ecommerce_website_url_uindex
        unique (url),
    constraint t_22_ecommerce_website_website_name_uindex
        unique (website_name)
)
    auto_increment = 371;

create table setu_fyp.t_21_ecommerce_json_data
(
    ecommerce_json_data_id int auto_increment
        primary key,
    json_data              json null,
    ecommerce_website_id   int  null,
    constraint esales_json_data_json_id_uindex
        unique (ecommerce_json_data_id),
    constraint esales_json_data_esales_website_esales_id_fk
        foreign key (ecommerce_website_id) references setu_fyp.t_22_ecommerce_website (ecommerce_website_id)
)
    auto_increment = 1633;

create table setu_fyp.t_23_past_statistics
(
    data_id           int auto_increment
        primary key,
    json_data_records json        null,
    role_type         varchar(16) null,
    constraint t_23_past_statistics_data_id_uindex
        unique (data_id),
    constraint t_23_past_statistics_role_type_uindex
        unique (role_type)
);

create table setu_fyp.t_32_parcel_station
(
    station_id                    int auto_increment
        primary key,
    community_name                varchar(32)   null,
    city                          varchar(32)   null,
    address                       varchar(128)  null,
    shelves_total_number          int           null,
    station_assign_manager_status int default 1 null,
    constraint parcelstation_station_id_uindex
        unique (station_id)
)
    auto_increment = 2031;

create table setu_fyp.t_33_parcel_station_shelf
(
    shelf_id                  int auto_increment
        primary key,
    main_shelf_serial_number  int null,
    floor_serial_number       int null,
    max_storage_parcel_number int null,
    parcel_station_id         int null,
    constraint parcelstationshelves_shelf_id_uindex
        unique (shelf_id),
    constraint parcelstationshelves_parcelstation_station_id_fk
        foreign key (parcel_station_id) references setu_fyp.t_32_parcel_station (station_id)
)
    auto_increment = 1185;

create table setu_fyp.t_44_truck
(
    truck_id            int auto_increment
        primary key,
    truck_type          varchar(16)   null,
    truck_plate_number  varchar(16)   null,
    max_weight          decimal(6, 2) null,
    storage_area_height decimal(6, 2) null,
    storage_area_length decimal(6, 2) null,
    storage_area_width  decimal(6, 2) null,
    volume              decimal(6, 2) null,
    truck_status        int default 1 null,
    constraint trunk_trunk_id_uindex
        unique (truck_id)
)
    auto_increment = 1021;

create table setu_fyp.t_62_sender
(
    sender_id    int auto_increment
        primary key,
    full_name    varchar(32)  null,
    email        varchar(32)  null,
    phone_number varchar(16)  null,
    city         varchar(16)  null,
    country      varchar(16)  null,
    address      varchar(256) null,
    constraint sender_email_uindex
        unique (email),
    constraint sender_phone_number_uindex
        unique (phone_number),
    constraint sender_sender_id_uindex
        unique (sender_id),
    constraint t_62_sender_full_name_uindex
        unique (full_name)
)
    auto_increment = 382;

create table setu_fyp.t_63_customer
(
    customer_id  int auto_increment
        primary key,
    full_name    varchar(32)  null,
    avatar       varchar(128) null,
    phone_number varchar(16)  null,
    order_email  varchar(32)  null,
    city         varchar(16)  null,
    country      varchar(16)  null,
    address      varchar(256) null,
    account_id   int          null,
    constraint account_id
        unique (account_id),
    constraint customer_customer_id_uindex
        unique (customer_id),
    constraint customer_full_name_uindex
        unique (full_name),
    constraint customer_phone_number_uindex
        unique (phone_number),
    constraint t_63_customer_order_email_uindex
        unique (order_email),
    constraint customer_registeredaccount_account_id_fk
        foreign key (account_id) references setu_fyp.t_11_registered_account (account_id)
)
    auto_increment = 1218;

create table setu_fyp.t_61_order
(
    order_id               int auto_increment
        primary key,
    order_date             datetime    null,
    order_status           varchar(16) null,
    expected_delivery_date datetime    null,
    ecommerce_website_id   int         null,
    customer_id            int         null,
    constraint order_order_id_uindex
        unique (order_id),
    constraint order_customer_customer_id_fk
        foreign key (customer_id) references setu_fyp.t_63_customer (customer_id),
    constraint order_esales_website_esales_id_fk
        foreign key (ecommerce_website_id) references setu_fyp.t_22_ecommerce_website (ecommerce_website_id)
)
    auto_increment = 95714;

create table setu_fyp.t_71_parcel_hub_company
(
    company_id   int auto_increment
        primary key,
    company_name varchar(64)  null,
    company_type varchar(16)  null,
    country      varchar(16)  null,
    city         varchar(16)  null,
    address      varchar(256) null,
    constraint parcelhubcompany_company_id_uindex
        unique (company_id)
)
    auto_increment = 1021;

create table setu_fyp.t_51_parcel
(
    parcel_id          int auto_increment
        primary key,
    length             decimal(6, 2) null,
    width              decimal(6, 2) null,
    height             decimal(6, 2) null,
    volume             decimal(6, 2) null,
    weight             decimal(6, 2) null,
    error_info         varchar(16)   null,
    order_id           int           null,
    sender_id          int           null,
    emerald_company_id int           null,
    station_id         int           null,
    shelf_id           int           null,
    constraint order_id
        unique (order_id),
    constraint parcel_parcel_id_uindex
        unique (parcel_id),
    constraint parcel_order_order_id_fk
        foreign key (order_id) references setu_fyp.t_61_order (order_id),
    constraint parcel_parcelstation_station_id_fk
        foreign key (station_id) references setu_fyp.t_32_parcel_station (station_id),
    constraint parcel_parcelstationshelves_shelf_id_fk
        foreign key (shelf_id) references setu_fyp.t_33_parcel_station_shelf (shelf_id),
    constraint parcel_sender_sender_id_fk
        foreign key (sender_id) references setu_fyp.t_62_sender (sender_id),
    constraint t_51_parcel_t_71_parcel_hub_company_company_id_fk
        foreign key (emerald_company_id) references setu_fyp.t_71_parcel_hub_company (company_id)
)
    auto_increment = 292;

create table setu_fyp.t_52_item
(
    item_id          int auto_increment
        primary key,
    description_info varchar(64)   null,
    quantity         int           null,
    error_info       varchar(32)   null,
    weight           decimal(6, 2) null,
    price            decimal(8, 2) null,
    parcel_id        int           null,
    constraint item_item_id_uindex
        unique (item_id),
    constraint item_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id)
)
    auto_increment = 98766;

create table setu_fyp.t_54_parcel_history_status
(
    status_id               int auto_increment,
    status_info             varchar(64)                        not null,
    status_update_timestamp datetime default CURRENT_TIMESTAMP null,
    parcel_id               int                                not null,
    primary key (status_info, parcel_id),
    constraint parcelstatus_status_id_uindex
        unique (status_id),
    constraint parcelstatus_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id)
)
    auto_increment = 339;

create table setu_fyp.t_55_parcel_pickup_code
(
    pickup_code_id int auto_increment
        primary key,
    pickup_code    varchar(16) null,
    parcel_id      int         null,
    constraint parcelpickupcode_parcel_id_uindex
        unique (parcel_id),
    constraint parcelpickupcode_pickup_code_id_uindex
        unique (pickup_code_id),
    constraint parcelpickupcode_pickup_code_uindex
        unique (pickup_code),
    constraint parcelpickupcode_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id)
)
    auto_increment = 24;

create table setu_fyp.t_56_parcel_tracking_code
(
    tracking_code_id     int auto_increment
        primary key,
    parcel_tracking_code varchar(64) null,
    parcel_id            int         null,
    constraint parceltrackingcode_parcel_id_uindex
        unique (parcel_id),
    constraint parceltrackingcode_parcel_tracking_code_uindex
        unique (parcel_tracking_code),
    constraint parceltrackingcode_tracking_code_id_uindex
        unique (tracking_code_id),
    constraint parceltrackingcode_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id)
)
    auto_increment = 151;

create table setu_fyp.t_81_role_type
(
    role_id   int auto_increment
        primary key,
    role_type varchar(16) null,
    constraint t_81_role_type_role_id_uindex
        unique (role_id),
    constraint t_81_role_type_role_type_uindex
        unique (role_type)
)
    auto_increment = 4002;

create table setu_fyp.t_72_company_employee
(
    employee_id   int auto_increment
        primary key,
    full_name     varchar(32)  null,
    employee_code varchar(64)  null,
    phone_number  varchar(16)  null,
    avatar        varchar(128) null,
    role_id       int          null,
    company_id    int          null,
    account_id    int          null,
    constraint account_id
        unique (account_id),
    constraint companyemployee_employee_code_uindex
        unique (employee_code),
    constraint companyemployee_employee_id_uindex
        unique (employee_id),
    constraint companyemployee_phone_number_uindex
        unique (phone_number),
    constraint t_72_company_employee_full_name_uindex
        unique (full_name),
    constraint companyemployee_parcelhubcompany_company_id_fk
        foreign key (company_id) references setu_fyp.t_71_parcel_hub_company (company_id),
    constraint companyemployee_registeredaccount_account_id_fk
        foreign key (account_id) references setu_fyp.t_11_registered_account (account_id),
    constraint t_72_company_employee_t_81_role_type_role_id_fk
        foreign key (role_id) references setu_fyp.t_81_role_type (role_id)
)
    auto_increment = 67;

create table setu_fyp.t_31_station_manager
(
    station_manager_id     int auto_increment
        primary key,
    employee_id            int                                null,
    start_date             date                               null,
    end_date               date                               null,
    register_time          datetime default CURRENT_TIMESTAMP null,
    station_id             int                                null,
    station_manager_status int      default 1                 null,
    constraint employee_id
        unique (employee_id),
    constraint station_id
        unique (station_id),
    constraint station_manager_station_manager_id_uindex
        unique (station_manager_id),
    constraint stationmanager_companyemployee_employee_id_fk
        foreign key (employee_id) references setu_fyp.t_72_company_employee (employee_id),
    constraint stationmanager_parcelstation_station_id_fk
        foreign key (station_id) references setu_fyp.t_32_parcel_station (station_id)
)
    auto_increment = 117;

create table setu_fyp.t_34_station_parcels_to_place
(
    place_id           int auto_increment
        primary key,
    station_manager_id int           null,
    parcel_id          int           null,
    station_id         int           null,
    place_status       int default 0 null,
    constraint t_34_station_parcels_to_place_parcel_id_uindex
        unique (parcel_id),
    constraint t_34_station_parcels_to_place_place_id_uindex
        unique (place_id),
    constraint station_manager__fk
        foreign key (station_manager_id) references setu_fyp.t_31_station_manager (station_manager_id),
    constraint t_34_station_parcels_to_place_t_32_parcel_station_station_id_fk
        foreign key (station_id) references setu_fyp.t_32_parcel_station (station_id),
    constraint t_34_station_parcels_to_place_t_51_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id)
)
    auto_increment = 429;

create table setu_fyp.t_41_courier
(
    courier_id                          int auto_increment
        primary key,
    employee_id                         int                                null,
    work_type                           varchar(16)                        null,
    daily_max_distribution_parcels_num  int                                null,
    remaining_parcels_num_to_distribute int                                null,
    register_time                       datetime default CURRENT_TIMESTAMP null,
    truck_id                            int                                null,
    courier_status                      int      default 1                 null,
    constraint courier_courier_id_uindex
        unique (courier_id),
    constraint courier_employee_id_uindex
        unique (employee_id),
    constraint t_41_courier_trunk_id_uindex
        unique (truck_id),
    constraint courier_company_employee_employee_id__fk
        foreign key (employee_id) references setu_fyp.t_72_company_employee (employee_id),
    constraint t_41_courier_t_43_trunk_trunk_id_fk
        foreign key (truck_id) references setu_fyp.t_44_truck (truck_id)
)
    auto_increment = 1023;

create table setu_fyp.t_42_courier_delivery_record
(
    delivery_record_id int auto_increment
        primary key,
    courier_id         int null,
    station_id         int null,
    parcel_id          int null,
    truck_id           int null,
    constraint courier_courier_delivery_record_id_uindex
        unique (delivery_record_id),
    constraint courier_parcel_id_uindex
        unique (parcel_id),
    constraint courier_delivery_record_courier_courier_id_fk
        foreign key (courier_id) references setu_fyp.t_41_courier (courier_id),
    constraint courier_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id),
    constraint courier_trunk_trunk_id_fk
        foreign key (truck_id) references setu_fyp.t_44_truck (truck_id),
    constraint t_42_courier_delivery_record_t_32_parcel_station_station_id_fk
        foreign key (station_id) references setu_fyp.t_32_parcel_station (station_id)
)
    auto_increment = 99;

create table setu_fyp.t_43_courier_collection_record
(
    collection_record_id int auto_increment
        primary key,
    courier_id           int null,
    sender_id            int null,
    parcel_id            int null,
    truck_id             int null,
    constraint t_43_courier_collection_record_collection_record_id_uindex
        unique (collection_record_id),
    constraint t_43_courier_collection_record_parcel_id_uindex
        unique (parcel_id),
    constraint t_43_courier_collection_record_t_41_courier_courier_id_fk
        foreign key (courier_id) references setu_fyp.t_41_courier (courier_id),
    constraint t_43_courier_collection_record_t_44_truck_truck_id_fk
        foreign key (truck_id) references setu_fyp.t_44_truck (truck_id),
    constraint t_43_courier_collection_record_t_51_parcel_parcel_id_fk
        foreign key (parcel_id) references setu_fyp.t_51_parcel (parcel_id),
    constraint t_43_courier_collection_record_t_62_sender_sender_id_fk
        foreign key (sender_id) references setu_fyp.t_62_sender (sender_id)
)
    auto_increment = 313;

create table setu_fyp.t_91_google_geocoding_cache
(
    geocoding_id int auto_increment
        primary key,
    longitude    decimal(9, 6) null,
    latitude     decimal(9, 6) null,
    address_type varchar(32)   null,
    address      varchar(64)   null,
    constraint t_91_google_geocoding_cache_address_uindex
        unique (address),
    constraint t_91_google_geocoding_cache_geocoding_id_uindex
        unique (geocoding_id)
)
    auto_increment = 35;


