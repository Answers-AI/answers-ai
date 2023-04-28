# README for Database Schema

## TODO Items
- None

## Known Issues
- None

## Description
This file contains the SQL code for creating the database schema for a web application. The schema includes tables for User, AppSettings, AppService, JiraSettings, and JiraProjectSetting. 

## Tables
### User
- id: SERIAL NOT NULL
- username: TEXT
- email: TEXT NOT NULL
- name: TEXT
- appSettings: JSONB NOT NULL
- image: TEXT NOT NULL DEFAULT ''

### AppSettings
- id: SERIAL NOT NULL
- jiraSettingsId: INTEGER NOT NULL

### AppService
- id: SERIAL NOT NULL
- name: TEXT NOT NULL
- enabled: BOOLEAN NOT NULL
- appSettingsId: INTEGER

### JiraSettings
- id: SERIAL NOT NULL

### JiraProjectSetting
- id: SERIAL NOT NULL
- key: TEXT NOT NULL
- enabled: BOOLEAN NOT NULL
- jiraSettingsId: INTEGER

## Indexes
- User_username_key: UNIQUE INDEX on User(username)
- User_email_key: UNIQUE INDEX on User(email)

## Foreign Keys
- AppSettings_jiraSettingsId_fkey: FOREIGN KEY on AppSettings(jiraSettingsId) REFERENCES JiraSettings(id) ON DELETE RESTRICT ON UPDATE CASCADE
- AppService_appSettingsId_fkey: FOREIGN KEY on AppService(appSettingsId) REFERENCES AppSettings(id) ON DELETE SET NULL ON UPDATE CASCADE
- JiraProjectSetting_jiraSettingsId_fkey: FOREIGN KEY on JiraProjectSetting(jiraSettingsId) REFERENCES JiraSettings(id) ON DELETE SET NULL ON UPDATE CASCADE