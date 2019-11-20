## 1. Env variables

| Param | Type                      | Required | Default |
|-------|---------------------------|----------|---------|
| ENV   | local, testing, dev, prod | Optional | local   |


## 2. Create cron task

| Function             | Method | Route      | Payload                                                                      |
|----------------------|--------|------------|------------------------------------------------------------------------------|
| Get list cron task   | GET    | /          |                                                                              |
| Create new cron task | POST   | /          | description?, (*)cronExpression, frequency, apiURL, method, payload, headers |
| Start cron task      | POST   | /:id/start |                                                                              |
| Stop cron task       | POST   | /:id/stop  |                                                                              |
| Destroy cron task    | DELETE | /:id       |                                                                              |

## 3. Note

1. Cron task auto start when created.
2. If api error status response 403: Auto destroy cron task
3. If api error status response 416: Don't save error log
4. (*) Cron expression syntax:

This is a quick reference to cron syntax and also shows the options supported by node-cron.

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

### Allowed values

| field        | value                             |
|--------------|-----------------------------------|
| second       | 0-59                              |
| minute       | 0-59                              |
| hour         | 0-23                              |
| day of month | 1-31                              |
| month        | 1-12 (or names)                   |
| day of week  | 0-7 (or names, 0 or 7 are sunday) |