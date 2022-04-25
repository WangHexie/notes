---
layout: post
title: Linux Basics
---

### 多命令连接(数据处理)
  * free \| grep fdf

### 后台执行：
  * using suffix '&'
  * start with nohop to igonore SIGNUP signal which is send when terminal closed

### 查看运行任务等
  * jobs
  * continue running jobs which paused by c+z using bg + `%id_of_job`
  * kill 

  ```bash
  $ sleep 1000
  ^Z
  [1]  + 18653 suspended  sleep 1000

  $ nohup sleep 2000 &
  [2] 18745
  appending output to nohup.out

  $ jobs
  [1]  + suspended  sleep 1000
  [2]  - running    nohup sleep 2000

  $ bg %1
  [1]  - 18653 continued  sleep 1000

  $ jobs
  [1]  - running    sleep 1000
  [2]  + running    nohup sleep 2000

  $ kill -STOP %1
  [1]  + 18653 suspended (signal)  sleep 1000

  $ jobs
  [1]  + suspended (signal)  sleep 1000
  [2]  - running    nohup sleep 2000

  $ kill -SIGHUP %1
  [1]  + 18653 hangup     sleep 1000

  $ jobs
  [2]  + running    nohup sleep 2000

  $ kill -SIGHUP %2

  $ jobs
  [2]  + running    nohup sleep 2000

  $ kill %2
  [2]  + 18745 terminated  nohup sleep 2000

  $ jobs
  ```

### version
  * (API change which is not back compatible)**\.**(API change which is back compatible)**\.**(No API change just patches)

## 参考文献

[^1]: [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)