drop table if exists buoy_info;

/*==============================================================*/
/* Table: buoy_info                                             */
/*==============================================================*/
create table buoy_info
(
   id                   int NOT NULL AUTO_INCREMENT,
   sim                  varchar(20),
   name                 varchar(50),
   type                 varchar(5),
   gps_location         int,
   gps_lat              numeric(8,2),
   gps_lng              numeric(8,2),
   gps_time             datetime,
   gps_signal           numeric(5,2) comment '信号',
   speed                numeric(6,2) comment '速度',
   altitude             numeric(6,2) comment '海拔',
   temp                 numeric(6,2) comment '温度',
   voltage              numeric(8,2) comment '电压',
   sys_time             datetime,
   create_time          datetime,
   PRIMARY KEY (`ID`)
);

alter table buoy_info comment '浮球';
