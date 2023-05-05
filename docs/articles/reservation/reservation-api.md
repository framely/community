# Reservation API reference
Version: v0.44.0

The Reservation API ([services.opencui.reservation.IReservation](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema)) is designed for booking scenarios, and provides functionality for creating, querying, and canceling reservations. This API exposes most of the features available in the reservation scenario.

- To utilize this service, ensure that you have an existing provider that implements it.
- To invoke this service, make sure you import it into your project and add a corresponding service slot within your target skill/frame type.

<!-- add entities as wel，目前有以下 entities：-->
## LocationName
The name of the location that can be displayed to customers.

## ResourceName
The name of the bookable resource that can be displayed to customers.

## ResourceType
The type of the bookable resource that can be displayed to customers.

## Location
The places where bookable resources are located, such as restaurants, hotels, or hair salons.

- Fields

  | Property | Type             | Description | 
  |:---------|:-----------------|:------------|
  | id       | kotlin.String    | The unique id for the location.                         |
  | name     | LocationName     | The location name as seen by customers, must be unique. |
  | timezone | java.time.ZoneId | The timezone of the location.                           |

<!-- 考虑到 listLocation 不是 Location 的 method，或许可以
1. 移除 Methods，只保留下面的 listLocation?
2. 或者将 Methods 改名为"Related methods", "Available actions" 或者 "Utility Methods"?-->

- Methods

  | Method | Description | 
  |:-------|:------------|
  | [listLocation](#listlocation) | Returns a list of locations for the reservation services. | 

### listLocation
Returns a list of locations for the reservation services. 

- **Parameters**

  No parameters

- **Return**

  If successful, this method returns a list of locations in the response body.

  | Type | Description |
  |:-----|:------------|
  | [Location[]](#location) | A list of locations. |

- **Code example**

  ``` kotlin 
  val locationList = listLocation()
  ```

## Resource
The bookable resources for customers, such as tables in a restaurant, doctors in a hospital, hairdressers in a hair salon, etc. Resource object is an abstract object. 

- Fields

  | Property  | Type             | Description | 
  |:----------|:-----------------|:------------|
  | id        | kotlin.String    | The unique ID for the bookable resource.   |
  | type      | ResourceType     | The type of the bookable resource.         |
  | name      | ResourceName     | The display name of the bookable resource. |
  | durations | kotlin.Int[]     | The durations of the Resource.             |
  | timezone  | java.time.zoneId | The timezone of the resource.              |

- Methods

  | Method | Description | 
  |:-------|:------------|
  | [getResourceInfo](#getresourceinfo) | Gets information about one Resource based on resource id. | 
  | [listResource](#listresource) | Returns a list of resources on the specified type for one location. | 
  | [resourceAvailable](#resourceavailable) | Checks whether there are available resources and returns ValidationResult. |

### getResourceInfo
Gets information about one resource based on resource id.

- **Parameters**

  | Label      | Type          | Description |
  |:-----------|:--------------|:------------|
  | resourceId | kotlin.String | Required. The unique id of the resource to retrieve. |

- **Return**

  If successful, the response body contains an instance of resource. When no one matches, it returns null. 

  | Type | Description |
  |:-----|:------------| 
  | [Resource](#resource) | The details of the instance of the resource's subclass, based on the resource id. |

- **Code example**

  ``` kotlin 
  val resource = getResourceInfo("resource id")
  ```

### listResource
Returns a list of resources on the specified type for one location. 

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------|
  | location | [Location](#location) | Required. The specified place that owns resources.  |
  | type     | ResourceType          | Required. The type of resource to retrieve.         |
  | duration | kotlin.int            | Required. The duration of the resource to retrieve. |
  | date     | java.time.LocalDate   | Optional. The date of resources to retrieve.        |
  | time     | java.time.LocalTime   | Optional. The time of resources to retrieve.        |

- **Return**

  If successful, this method returns a list of resources. If not found, it returns null.

  | Type | Description |
  |:-----|:------------|
  | [Resource[]](#resource) | A list of resources that matches the specified parameter value in the request. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600

  val resourceList = listResource(location, resourceType, date, time, duration)
  ```

### resourceAvailable
Checks whether a specified resource is available.

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------|
  | resource | [Resource](#resource) | Required. The resource to retrieve.                 |
  | duration | kotlin.int            | Required. The duration of the resource to retrieve. |
  | date     | java.time.LocalDate   | Optional. The date of the resource to retrieve.     |
  | time     | java.time.LocalTime   | Optional. The time of the resource to retrieve.     |

- **Return**

  | Type                                  | Description     | 
  |:--------------------------------------|:----------------|
  | [ValidationResult](#validationresult) | The result shows whether the resource is available. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600
  val resource = listResource(location, resourceType, date, time, duration).first()

  val result = resourceAvailable(date, time, duration, resource)
  ```

## Date

### availableDates
Returns a list of available dates for a specified resource.

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------| 
  | resource | [Resource](#resource) | Required. The specified resource to retrieve.       |
  | duration | kotlin.int            | Required. The duration of the resource to retrieve. |
  | time     | java.time.LocalTime   | Optional. The time of the resource to retrieve.     | 
  
- **Return**

  | Type                  | Description |
  |:----------------------|:------------| 
  | java.time.localDate[] | A list of available dates on the specified resource that match the specified parameter value in the request. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600
  val resource = listResource(location, resourceType, null, time, duration).first()

  val dateList = availableDates(time, duration, resource)
  ```

## Time

### availableTimes
Returns a list of available times for a specified resource.

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------| 
  | resource | [Resource](#resource) | Required. The specified resource to retrieve.       |
  | duration | kotlin.int            | Required. The duration of the resource to retrieve. |
  | date     | java.time.LocalDate   | Optional. The date of the resource to retrieve.     | 

- **Return**

  | Type | Description |
  |:-----|:------------| 
  | java.time.localTime[] | A list of available times on the specified resource that match the specified parameter value in the request. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val duration = 3600
  val resource = listResource(location, resourceType, date, null, duration).first()

  val timeList = availableTimes(date, duration, resource) 
  ```

## Reservation
The customer's booking for a resource at a specific location. Each reservation is a unique booking created by a customer.

- Fields

  | Property   | Type                     | Description | 
  |:-----------|:-------------------------|:------------|
  | id         | kotlin.String            | The unique id of the reservation.                              |
  | resourceId | kotlin.String            | The id of the booked resource.                                 |
  | userId     | kotlin.String            | The unique id of the customer associated with the reservation. |
  | start      | java.time.OffsetDateTime | The start date and time of the reservation.                    |
  | end        | java.time.OffsetDateTime | The end date and time of the reservation.                      |
  | offset     | kotlin.Int               | The timezone offset.                                           |

- Methods

  | Method                                     | Description | 
  |:-------------------------------------------|:------------|
  | [makeReservation](#makereservation)        | Creates a new reservation for a customer.                | 
  | [listReservation](#listreservation)        | Returns a list of reservations for a specified customer. | 
  | [cancelReservation](#cancelreservation)    | Deletes a specified reservation.                         | 
  | [updateReservationn](#updatereservation)   | Updates a specified reservation.                         | 
  | [reservationCancelable](#listreservation)  | Checks whether a specified reservation can be cancelled. | 
  | [reservationUpdatable](#cancelreservation) | Checks whether a specified reservation can be updated.   | 

### makeReservation
Creates a new reservation for a customer.

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------| 
  | userId   | kotlin.String         | Required. The unique ID of the customer.       |
  | resource | [Resource](#resource) | Required. The resource to be reserved.         |
  | duration | kotlin.int            | Required. The duration of the resource.        |
  | date     | java.time.LocalDate   | Optional. The date of the reservation.         |
  | time     | java.time.LocalTime   | Optional. The time of the reservation.         |

- **Return**

  If successful, this method returns a reservation in the response body. Otherwise, null is returned.

  | Type | Description |
  |:-----|:------------| 
  | [Reservation](#reservation) | A reservation instance created by the customer. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600
  val resource = listResource(location, resourceType, date, time, duration).first()

  val reservation = makeReservation("TestUser", date, time, duration, resource )
  ```

### listReservation
Returns a list of reservations for a specified customer.

- **Parameters**

  | Label        | Type                  | Description |
  |:-------------|:----------------------|:------------| 
  | userId       | kotlin.String         | Required. The unique id of the customer.                     |
  | location     | [Location](#location) | Optional. The location of the reservations to retrieve.      |
  | resourceType | ResourceType          | Optional. The resource type of the reservations to retrieve. |

- **Return**

  If successful, this method returns a list of reservations in the response body.

  | Type | Description |
  |:-----|:------------| 
  | [Reservation[]](#reservation) | A list of reservations matching the request criteria. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")

  val reservationList = listReservation("TestUser", location, resourceType)
  ```

### cancelReservation
Cancel a reservation that was previously made by a customer.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [Reservation](#reservation) | Required. The reservation to be cancelld. |

- **Return**

  | Type                                  | Description | 
  |:--------------------------------------|:------------|
  | [ValidationResult](#validationresult) | The result shows whether the reservation was cancelled. |


- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val reservaion = listReservation("TestUser", location, resourceType).first()

  val result = cancelReservation(reservation)
  ```

### updateReservation
Update a reservation that was previously made by a customer.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [reservation](#reservation) | Required. The specified reservation to be updated.  |
  | resource    | [Resource](#resource)       | Required. The resource of the reservation.          |
  | duration    | kotlin.int                  | Required. The resource duration of the reservation. |
  | date        | java.time.LocalDate         | Optional. The date of the reservation.              |
  | time        | java.time.LocalTime         | Optional. The time of the reservation.              |       

- **Return**

  | Type   | Description | 
  |:-------|:------------|
  | [ValidationResult](#validationresult) | The result shows whether the reservation was updated. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val reservaion = listReservation("TestUser", location, resourceType).first()
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600
  val resource = listResource(location, resourceType, date, time, duration).first()

  val result = updateReservation(reservation, date, time, duration, resource)
  ```

### reservationCancelable
Checks whether a particular reservation can be cancelled.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [Reservation](#reservation) | Required. The reservation to check for cancellation. |

- **Return**

  | Type                                  | Description  | 
  |:--------------------------------------|:-------------|
  | [ValidationResult](#validationresult) | The result shows whether the reservation is cancelable. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val reservation = listReservation("TestUser", location, resourceType).first()

  val result = reservationCancelable(reservation)
  ```

### reservationUpdatable
Checks whether a particular reservation can be updated.

- **Parameters**
  
  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [reservation](#reservation) | Required. The reservation to check for update.      |
  | resource    | [Resource](#resource)       | Required. The resource of the reservation.          |
  | duration    | kotlin.int                  | Required. The resource duration of the reservation. |
  | date        | java.time.LocalDate         | Optional. The date of the reservation.              |
  | time        | java.time.LocalTime         | Optional. The time of the reservation.              |      

- **Return**

  | Type                                  | Description  | 
  |:--------------------------------------|:-------------|
  | [ValidationResult](#validationresult) | The result shows whether the reservation is updatable. |

- **Code example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val reservaion = listReservation("TestUser", location, resourceType).first()
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600
  val resource = listResource(location, resourceType, date, time, duration).first()

  val result = reservationUpdatable(reservation, date, time, duration, resource)
  ```

## ValidationResult
The outcome of the verification or operation.

  | Property           | Type            | Description | 
  |:-------------------|:----------------|:------------|
  | success            | kotlin.Boolean  | A boolean value indicating the success or failure. |
  | invalidFeatureKeys | kotlin.String[] | A list of invalid feature keys, if any.            |
  | message            | kotlin.String   | An error message of the invalid feature.           |
