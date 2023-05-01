# API Reference
Version: v0.44.0

The Reservation API ([services.opencui.reservation.IReservation](https://build.opencui.io/org/services.opencui/agent/reservation/struct/service_schema)) is applied to booking scenarios, including creating bookings, querying bookings, and canceling bookings, which exposes most of the features available in the reservation scenario. 

- To utilize this service, ensure that you have an existing provider that implements it.
- To invoke this service, ensure that your project has imported it and used it within your target skill/frame type.

## Location
The places where bookable resources are located. For example, restaurants, hotels, or hair salons.

- Fields

  | Property | Type             | Description | 
  |:---------|:-----------------|:------------|
  | id       | kotlin.String    | The unique ID for the location. |
  | name     | LocationName     | The location name as seen by customers. Must be unique for the customer. |
  | timezone | java.time.ZoneId | The timezone of the location.  |

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

- **Example**

  ``` kotlin 
  val locationList = listLocation()
  ```


## Resource
The bookable resources are provided for customers, such as tables in a restaurant, doctors in a hospital, hairdressers in a hair salon, etc. Resource object is an abstract object. 

- Fields

  | Property  | Type             | Description | 
  |:----------|:-----------------|:------------|
  | id        | kotlin.String    | The unique ID for the bookable resource. |
  | type      | ResourceType     | The type of the bookable resource. |
  | name      | ResourceName     | The name of the bookable resource. |
  | durations | kotlin.Int[]     | The durations of the Resource. |
  | timezone  | java.time.zoneId | The timezone of the resource. |


- Methods

  | Method | Description | 
  |:-------|:------------|
  | [getResourceInfo](#getresourceinfo) | Gets information about a resource. | 
  | [listResource](#listresource) | Returns a list of resources on the specified type for one location. | 
  | [resourceAvailable](#resourceavailable) | Checks whether there are available resources. | 


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

- **Example**

  ``` kotlin 
  val resource = getResourceInfo("resource id")
  ```

### listResource
Returns a list of resources on the specified type for one location. 

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------|
  | location | [Location](#location) | Required. The specified place that owns resources. |
  | type     | ResourceType          | Required. The type of resource to retrieve.  |
  | duration | kotlin.int            | Required. The duration of the resource to retrieve. |
  | date     | java.time.LocalDate   | Optional. The date of resources to retrieve. |
  | time     | java.time.LocalTime   | Optional. The time of resources to retrieve. |

- **Return Type**

  If successful, this method returns a list of resources. If not found, it returns null.

  | Type | Description |
  |:-----|:------------|
  | [Resource[]](#resource) | A list of resources that matches the specified parameter value in the request. |

- **Code Example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600

  val resourceList = listResource(location, resourceType, date, time, duration)
  ```

### resourceAvailable
Checks whether there are available resources, and returns [ValidationResult](#validationresult).

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------|
  | resource | [Resource](#resource) | Required. The resource to retrieve. |
  | duration | kotlin.int            | Required. The duration of the resource to retrieve. |
  | date     | java.time.LocalDate   | Optional. The date of the resource to retrieve. |
  | time     | java.time.LocalTime   | Optional. The time of the resource to retrieve. |

- **Example**

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
Returns a list of available dates on the specified resource.

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------| 
  | resource | [Resource](#resource) | Required. Specify the resource to retrieve. |
  | duration | kotlin.int            | Required. Specify the duration of the resource to retrieve. |
  | time     | java.time.LocalTime   | Optional. Specify the time of the resource to retrieve. | 
  
- **Return**

  | Type | Description |
  |:-----|:------------| 
  | java.time.localDate[] | A list of available dates on the specified resource that matches the specified parameter value in the request. |

- **Code Example**

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
Returns a list of available times on the specified resource.

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------| 
  | resource | [Resource](#resource) | Required. Specify the resource to retrieve. |
  | duration | kotlin.int            | Required. Specify the duration of the resource to retrieve. |
  | date     | java.time.LocalDate   | Optional. Specify the date of the resource to retrieve. | 

- **Return**

  | Type | Description |
  |:-----|:------------| 
  | java.time.localTime[] | A list of available times on the specified resource that matches the specified parameter value in the request. |

- **Example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val duration = 3600
  val resource = listResource(location, resourceType, date, null, duration).first()

  val timeList = availableTimes(date, duration, resource) 
  ```


## Reservation
A reservation represents the booking of one resource at one location. Each reservation is a unique booking created by a customer.

- Fields

  | Property   | Type                     | Description | 
  |:-----------|:-------------------------|:------------|
  | id         | kotlin.String            | The unique ID of the reservation. |
  | resourceId | kotlin.String            | The resource ID of the reservation. |
  | userId     | kotlin.String            | The unique ID of the customer. |
  | start      | java.time.OffsetDateTime | The start date and time of a reservation. |
  | end        | java.time.OffsetDateTime | The end date and time of a reservation.   |
  | offset     | kotlin.Int               | The zone offset.                            |

- Methods

  | Method | Description | 
  |:-------|:------------|
  | [makeReservation](#makereservation) | Creates a reservation. | 
  | [listReservation](#listreservation) | Returns a list of reservations for the specified customer. | 
  | [cancelReservation](#cancelreservation) | Deletes a reservation. | 
  | [updateReservationn](#updatereservation) | Updates a reservation. | 
  | [reservationCancelable](#listreservation) | Checks whether a reservation can be cancelled. | 
  | [reservationUpdatable](#cancelreservation) | Checks whether a reservation can be updated. | 

### makeReservation
Creates a reservation. 

- **Parameters**

  | Label    | Type                  | Description |
  |:---------|:----------------------|:------------| 
  | userId   | kotlin.String         | Required. The unique ID of the customer. |
  | resource | [Resource](#resource) | Required. The resource of the reservation. |
  | duration | kotlin.int            | Required. The resource duration of the reservation. |
  | date     | java.time.LocalDate   | Optional. The date of the reservation.  |
  | time     | java.time.LocalTime   | Optional. The time of the reservation.  |

- **Return**

  If successful, this method returns a reservation in the response body, null on failure.

  | Type | Description |
  |:-----|:------------| 
  | [Reservation](#reservation) | A reservation instance by the customer. |

- **Example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val date = LocalDate.of(2023, 2, 20)
  val time = LocalTime.of(14, 0, 0, 0)
  val duration = 3600
  val resource = listResource(location, resourceType, date, time, duration).first()

  val reservation = makeReservation("TestUser", date, time, duration, resource)
  ```

### listReservation
Returns a list of reservations for the specified customer.

- **Parameters**

  | Label        | Type                  | Description |
  |:-------------|:----------------------|:------------| 
  | userId       | kotlin.String         | Required. The unique ID of the customer. |
  | location     | [Location](#location) | Optional. The location of the reservations to retrieve. |
  | resourceType | ResourceType          | Optional. The resource type of the reservations to retrieve. |

- **Return**

  If successful, this method returns a list of reservations in the response body.

  | Type | Description |
  |:-----|:------------| 
  | [Reservation[]](#reservation) | A list of reservations by the specified customer. |

- **Example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")

  val reservationList = listReservation("TestUser", location, resourceType)
  ```

### cancelReservation
Deletes a reservation, and returns the [ValidationResult](#validationresult) object indicating whether the status of the cancellation operation was successful.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [Reservation](#reservation) | Required. The specified reservation needs to be cancelled.  |

- **Example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val reservaion = listReservation("TestUser", location, resourceType).first()

  val result = cancelReservation(reservation)
  ```

### updateReservation
Update a reservation, and returns the [ValidationResult](#validationresult) object indicating whether the status of the update operation was successful.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [reservation](#reservation) | Required. The specified reservation needs to be updated. |
  | resource    | [Resource](#resource)       | Required. The resource of the reservation. |
  | duration    | kotlin.int                  | Required. The resource duration of the reservation. |
  | date        | java.time.LocalDate         | Optional. The date of the reservation.  |
  | time        | java.time.LocalTime         | Optional. The time of the reservation.  |        

- **Example**

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
Checks whether a reservation can be cancelled, and returns the [ValidationResult](#validationresult) object indicating whether the specified reservation can be cancelled.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [Reservation](#reservation) | Required. The specified reservation needs to be cancelled. |

- **Example**

  ``` kotlin 
  val location = listLocation().first()
  val resourceType = ResourceType("table")
  val reservation = listReservation("TestUser", location, resourceType).first()

  val result = reservationCancelable(reservation)
  ```

### reservationUpdatable
Checks whether a reservation can be updated, and returns the [ValidationResult](#validationresult) object indicating whether the specified reservation can be updated.

- **Parameters**

  | Label       | Type                        | Description |
  |:------------|:----------------------------|:------------| 
  | reservation | [reservation](#reservation) | Required. The specified reservation needs to be updated. |
  | resource    | [Resource](#resource)       | Required. The resource of the reservation. |
  | duration    | kotlin.int                  | Required. The resource duration of the reservation. |
  | date        | java.time.LocalDate         | Optional. The date of the reservation.  |
  | time        | java.time.LocalTime         | Optional. The time of the reservation.  |        

- **Example**

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
The result object indicates whether the verification or the operation was successful.

  | Property           | Type            | Description | 
  |:-------------------|:----------------|:------------|
  | success            | kotlin.Boolean  | The result of the verification or the operation, true or false. |
  | invalidFeatureKeys | kotlin.String[] | The invalid feature. |
  | message            | kotlin.String   | The error message of the invalid feature. |
