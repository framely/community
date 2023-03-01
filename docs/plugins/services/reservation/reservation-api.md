# Reservation API

## API List

### makeReservation

**Function Brief**

Book a resource provided by a service.

**Function Parameters**

| Name      | Type                  | Nullable | Description                                                                                                         |
|:----------|:----------------------|:---------|:--------------------------------------------------------------------------------------------------------------------|
| userId    | kotlin.String         | false    | Unique identification of the customer's identity, which can be User Identification from platforms such as WhatsApp. |
| date      | java.time.LocalDate   | true     | The date booked, if null, the resource booked for the most recent date that meets the criteria.                     |
| time      | java.time.LocalTime   | true     | Booked time, if null, book the resource at the most recent time that meets the criteria.                            |
| duration  | kotlin.int            | false    | Duration of the reservation, in seconds.                                                                            |
| resource  | [Resource](#resource) | false    | The resource booked.                                                                                                |

**Return Type**

| Type                        | Nullable | Description                                     |
|:----------------------------|:---------|:------------------------------------------------|
| [Reservation](#reservation) | true     | Returns a successful booking, null on failure.  |

**Code Example**

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

**Function Brief**

Query the customer's reservation list, expired or cancelled reservations are not in the return list.

**Function Parameters**

| Name         | Type                  | Nullable | Description                                                                                                                               |
|:-------------|:----------------------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------|
| userId       | kotlin.String         | false    | Unique identification of the customer's identity, which can be User Identification from platforms such as WhatsApp.                       |
| location     | [Location](#location) | true     | A place that provides booking services, which can be a restaurant, or a hospital, etc. If null, it returns reservations in all locations. |
| resourceType | ResourceType          | true     | Type of reservation resource. If null, it returns reservations with all resource types.                                                   |

**Return Type**

| Type                              | Nullable | Description                                                                                     |
|:----------------------------------|:---------|:------------------------------------------------------------------------------------------------|
| List<[Reservation](#reservation)> | false    | Returns successful reservations, expired/completed/cancelled reservations are not on the list.  |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")

val reservationList = listReservation("TestUser", location, resourceType)
```

### cancelReservation

**Function Brief**

Cancel a reservation.

**Function Parameters**

| Name         | Type                        | Nullable | Description                      |
|:-------------|:----------------------------|:---------|:---------------------------------|
| reservation  | [Reservation](#reservation) | false    | Reservations you wish to cancel. |

**Return Type**

| Type                                  | Nullable | Description                                                              |
|:--------------------------------------|:---------|:-------------------------------------------------------------------------|
| [ValidationResult](#validationresult) | false    | Returns the status of whether the cancellation operation was successful. |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")
val reservaion = listReservation("TestUser", location, resourceType).first()

val result = cancelReservation(reservation)
```

### resourceAvailable

**Function Brief**

Check if there are resources to book that meet the parameter criteria.

**Function Parameters**

| Name      | Type                   | Nullable | Description                                                                                        |
|:----------|:-----------------------|:---------|:---------------------------------------------------------------------------------------------------|
| date      | java.time.LocalDate    | true     | The date booked, or if null, the resource booked for the most recent date that meets the criteria. |
| time      | java.time.LocalTime    | true     | Booked time, if null, book the resource at the most recent time that meets the criteria.           |
| duration  | kotlin.int             | false    | Duration of the reservation, in seconds.                                                           |
| resource  | [Resource](#resource)  | false    | The resource booked.                                                                               |

**Return Type**

| Type                                  | Nullable  | Description                                                                                    |
|:--------------------------------------|:----------|:-----------------------------------------------------------------------------------------------|
| [ValidationResult](#validationresult) | false     | Returns a successful status when there is a resource that satisfies the parameter conditions.  |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")
val date = LocalDate.of(2023, 2, 20)
val time = LocalTime.of(14, 0, 0, 0)
val duration = 3600
val resource = listResource(location, resourceType, date, time, duration).first()

val result = resourceAvailable(date, time, duration, resource)
```


### reservationUpdatable

**Function Brief**

Checks if a booking can be timed or replaced with another resource that meets the criteria of the incoming parameter.

**Function Parameters**

| Name        | Type                        | Nullable | Description                                                                                        |
|:------------|:----------------------------|:---------|:---------------------------------------------------------------------------------------------------|
| reservation | [Reservation](#reservation) | false    | Booking objects that need to be updated.                                                           |
| date        | java.time.LocalDate         | true     | The date booked, or if null, the resource booked for the most recent date that meets the criteria. |
| time        | java.time.LocalTime         | true     | Booked time, if null, book the resource at the most recent time that meets the criteria.           |
| duration    | kotlin.int                  | false    | Duration of the reservation, in seconds.                                                           |
| resource    | [Resource](#resource)       | false    | The resource booked.                                                                               |

**Return Type**

| Type                                  | Nullable  | Description                                                                                    |
|:--------------------------------------|:----------|:-----------------------------------------------------------------------------------------------|
| [ValidationResult](#validationresult) | false     | Returns a success status if the booking can be updated according to the parameter conditions.  |

**Code Example**

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

### updateReservation

**Function Brief**

Time adjustments or resource changes to reservations.

**Function Parameters**

| Name        | Type                        | Nullable | Description                                                                                        |
|:------------|:----------------------------|:---------|:---------------------------------------------------------------------------------------------------|
| reservation | [Reservation](#reservation) | false    | Booking objects that need to be updated.                                                           |
| date        | java.time.LocalDate         | true     | The date booked, or if null, the resource booked for the most recent date that meets the criteria. |
| time        | java.time.LocalTime         | true     | Booked time, if null, book the resource at the most recent time that meets the criteria.           |
| duration    | kotlin.int                  | false    | Duration of the reservation, in seconds.                                                           |
| resource    | [Resource](#resource)       | false    | The resource booked.                                                                               |

**Return Type**

| Type                                  | Nullable  | Description                                                     |
|:--------------------------------------|:----------|:----------------------------------------------------------------|
| [ValidationResult](#validationresult) | false     | Returns a success status if the update booking was successful.  |             

**Code Example**

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

**Function Brief**

Check if a reservation can be cancelled.

**Function Parameters**

| Name         | Type                        | Nullable | Description                             |
|:-------------|:----------------------------|:---------|:----------------------------------------|
| reservation  | [Reservation](#reservation) | false    | Reservations that need to be cancelled. |              

**Return Type**

| Type                                   | Nullable     | Description                                                 |
|:---------------------------------------|:-------------|:------------------------------------------------------------|
| [ValidationResult](#validationresult)  | false        | Returns success status if the reservation can be cancelled. |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")
val reservation = listReservation("TestUser", location, resourceType).first()

val result = reservationCancelable(reservation)
```

### listLocation

**Function Brief**

Returns a list of entities that provide services, for example, if a merchant has multiple stores, returns a list of stores.

**Function Parameters**

None

**Return Type**

| Type                        | Nullable | Description                                                                                                                  |
|:----------------------------|:---------|:-----------------------------------------------------------------------------------------------------------------------------|
| List<[Location](#location)> | false    | Returns a list of entities that provide services. For example, if a merchant has multiple stores, returns a list of stores.  |

**Code Example**

``` kotlin 
val locationList = listLocation()
 
```

### availableDates

**Function Brief**

Gets a list of dates on which resources that meet the parameter criteria can be booked.

**Function Parameters**

| Name      | Type                    | Nullable | Description                                 |
|:----------|:------------------------|:---------|:--------------------------------------------|
| time      | java.time.LocalTime     | true     | Reservation time, if null, any time can be. |
| duration  | kotlin.int              | false    | Duration of the reservation, in seconds.    |
| resource  | [Resource](#resource)   | false    | The resource booked.                        |

**Return Type**

| Type                       | Nullable | Description                                                                                   |
|:---------------------------|:---------|:----------------------------------------------------------------------------------------------|
| List<java.time.localDate>  | false    | Returns a list of dates on which resources that meet the parameter conditions can be booked.  |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")
val time = LocalTime.of(14, 0, 0, 0)
val duration = 3600
val resource = listResource(location, resourceType, null, time, duration).first()

val dateList = availableDates(time, duration, resource)
```

### availableTimes

**Function Brief**

Get a list of times when resources that meet the parameter criteria can be booked.

**Function Parameters**

| Name      | Type                   | Nullable | Description                                                                                            |
|:----------|:-----------------------|:---------|:-------------------------------------------------------------------------------------------------------|
| date      | java.time.LocalDate    | true     | The date booked, if null, returns a list of times the service provider can book during business hours. |
| duration  | kotlin.int             | false    | Duration of the reservation, in seconds.                                                               |
| resource  | [Resource](#resource)  | false    | The resource booked.                                                                                   |

**Return Type**

| Type                       | Nullable | Description                                                                              |
|:---------------------------|:---------|:-----------------------------------------------------------------------------------------|
| List<java.time.localTime>  | false    | Returns a list of times when resources that meet the parameter conditions can be booked. |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")
val date = LocalDate.of(2023, 2, 20)
val duration = 3600
val resource = listResource(location, resourceType, date, null, duration).first()

val timeList = availableTimes(date, duration, resource) 
```

### getResourceInfo

**Function Brief**

Read details of a resource.

**Function Parameters**

| Name        | Type           | Nullable | Description                |
|:------------|:---------------|:---------|:---------------------------|
| resourceId  | kotlin.String  | false    | Unique id of the resource. |

**Return Type**

| Type                     | Nullable | Description                                                                                                                                     |
|:-------------------------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| [Resource](#resource)    | true     | Returns the subclass object of Resource according to different resource types. When no resource matching resourceId is found, it returns null.  |

**Code Example**

``` kotlin 
val resource = getResourceInfo("resource id")
```

### listResource

**Function Brief**

Read the list of resources that meet the parameter conditions.

**Function Parameters**

| Name     | Type                  | Nullable | Description                                                                                        |
|:---------|:----------------------|:---------|:---------------------------------------------------------------------------------------------------|
| location | [Location](#location) | false    | A place that provides booking services, which can be a restaurant, or a hospital, etc.             |
| type     | ResourceType          | false    | Type of reservation resource.                                                                      |
| date     | java.time.LocalDate   | true     | The date booked, or if null, the resource booked for the most recent date that meets the criteria. |
| time     | java.time.LocalTime   | true     | Booked time, if null, book the resource at the most recent time that meets the criteria.           |
| duration | kotlin.int            | false    | Duration of the reservation, in seconds.                                                           |

**Return Type**

| Type                        | Nullable | Description                                                                                                                                                  |
|:----------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| List<[Resource](#resource)> | false    | Returns a list of resources that meet the parameter conditions. The Resource objects in different lists of resource types are subclass objects of Resource.  |

**Code Example**

``` kotlin 
val location = listLocation().first()
val resourceType = ResourceType("table")
val date = LocalDate.of(2023, 2, 20)
val time = LocalTime.of(14, 0, 0, 0)
val duration = 3600

val resourceList = listResource(location, resourceType, date, time, duration)
```

## Data Structure

### Location

| Name      | Type              | Example Value                  | Description                  |
|:----------|:------------------|:-------------------------------|:-----------------------------|
| id        | kotlin.String     |                                | Unique ID of Location.       |
| name      | LocationName      | LocationName("some location")  | Location name.               |
| timezone  | java.time.ZoneId  |                                | A timezone of the location.  |


### Reservation

| Name       | Type                     | Description                               |
|:-----------|:-------------------------|:------------------------------------------|
| id         | kotlin.String            | Unique ID of Reservation.                 |
| resourceId | kotlin.String            | Unique ID of the reserved resource.       |
| userId     | kotlin.String            | Booking customer's identity unique id.    |
| start      | java.time.OffsetDateTime | The start date and time of a reservation. |
| end        | java.time.OffsetDateTime | The end date and time of a reservation.   |
| offset     | kotlin.Int               | A zone offset.                            |

### Resource

This data structure records the basic information of Resource, and the Resource actually returned by the interface is the subclass object corresponding to its type.

| Name      | Type              | Example Value                  | Description                  |
|:----------|:------------------|:-------------------------------|:-----------------------------|
| id        | kotlin.String     |                                | Resource's unique id.        |
| type      | ResourceType      | ResourceType("table")          | Type of Resource.            |
| name      | ResourceName      | ResourceName("some resource")  | Name of the Resource.        |
| durations | List<kotlin.Int>  |                                | Durations of the Resource.   |
| timezone  | java.time.zoneId  |                                | A timezone of the Resource.  |

### ValidationResult

The result object returned by the relevant interface of the checksum operation, indicating that the checksum is successful or the operation is successful.

| Name               | Type                | Example Value | Description                                                                          |
|:-------------------|:--------------------|:--------------|:-------------------------------------------------------------------------------------|
| success            | kotlin.Boolean      | true/false    |                                                                                      |
| invalidFeatureKeys | List<kotlin.String> |               | When the verification fails, return the slot name list that failed the verification. |
| message            | kotlin.String       |               | Error message causing success to be false.                                           |