function getResults() {
    const jobMeta = {
        "Hospital - Painter": { rate: 31.25, benefitsRate: 1 },
        "Hospital - Laborer": { rate: 20.0, benefitsRate: 0.5 },
        "Shop - Laborer": { rate: 16.25, benefitsRate: 1.25 }
    };
    
    const employeeData = [
        {
            "employee": "Mike",
            "timePunch": [
                { job: "Hospital - Laborer", start: "2022-02-18 09:00:01", end: "2022-02-18 11:28:54" },
                { job: "Hospital - Painter", start: "2022-02-18 12:29:33", end: "2022-02-18 14:00:59" },
                { job: "Shop - Laborer", start: "2022-02-19 08:16:51", end: "2022-02-19 10:00:11" },
                { job: "Hospital - Painter", start: "2022-02-19 11:11:06", end: "2022-02-19 12:00:14" },
                { job: "Shop - Laborer", start: "2022-02-19 13:22:13", end: "2022-02-19 17:16:32" },
                { job: "Hospital - Painter", start: "2022-02-20 06:50:12", end: "2022-02-20 11:21:11" },
                { job: "Hospital - Painter", start: "2022-02-20 13:01:11", end: "2022-02-20 17:52:45" },
                { job: "Hospital - Laborer", start: "2022-02-21 07:08:11", end: "2022-02-21 12:22:33" },
                { job: "Hospital - Painter", start: "2022-02-21 13:15:10", end: "2022-02-21 17:58:06" },
                { job: "Hospital - Painter", start: "2022-02-22 07:11:59", end: "2022-02-22 11:00:01" },
                { job: "Hospital - Painter", start: "2022-02-22 12:16:54", end: "2022-02-22 17:59:03" }
            ]
        },
        {
            "employee": "Steve",
            "timePunch": [
                { job: "Hospital - Painter", start: "2022-02-18 06:02:35", end: "2022-02-18 11:28:54" },
                { job: "Hospital - Painter", start: "2022-02-18 12:31:06", end: "2022-02-18 15:00:11" },
                { job: "Shop - Laborer", start: "2022-02-19 07:03:41", end: "2022-02-19 10:00:45" },
                { job: "Hospital - Painter", start: "2022-02-19 10:24:58", end: "2022-02-19 12:00:19" },
                { job: "Hospital - Painter", start: "2022-02-19 13:22:13", end: "2022-02-19 17:16:32" },
                { job: "Hospital - Painter", start: "2022-02-20 05:56:00", end: "2022-02-20 11:33:23" },
                { job: "Hospital - Painter", start: "2022-02-20 12:18:45", end: "2022-02-20 17:48:41" },
                { job: "Hospital - Painter", start: "2022-02-21 06:02:28", end: "2022-02-21 12:22:19" },
                { job: "Hospital - Painter", start: "2022-02-21 13:04:01", end: "2022-02-21 17:52:06" },
                { job: "Hospital - Painter", start: "2022-02-22 06:00:58", end: "2022-02-22 11:02:55" },
                { job: "Hospital - Painter", start: "2022-02-22 12:18:04", end: "2022-02-22 17:48:41" }
            ]
        },
        {
            "employee": "Alex",
            "timePunch": [
                { job: "Shop - Laborer", start: "2022-02-18 06:05:55", end: "2022-02-18 11:18:14" },
                { job: "Shop - Laborer", start: "2022-02-18 11:30:09", end: "2022-02-18 14:00:01" },
                { job: "Shop - Laborer", start: "2022-02-19 07:18:22", end: "2022-02-19 11:07:45" },
                { job: "Hospital - Laborer", start: "2022-02-19 12:04:18", end: "2022-02-19 14:00:19" },
                { job: "Shop - Laborer", start: "2022-02-20 06:06:00", end: "2022-02-20 10:13:23" },
                { job: "Shop - Laborer", start: "2022-02-20 12:18:45", end: "2022-02-20 16:58:21" },
                { job: "Shop - Laborer", start: "2022-02-21 06:08:08", end: "2022-02-21 12:20:55" },
                { job: "Shop - Laborer", start: "2022-02-21 12:54:30", end: "2022-02-21 16:45:20" },
                { job: "Hospital - Laborer", start: "2022-02-22 06:09:14", end: "2022-02-22 11:30:11" },
                { job: "Hospital - Laborer", start: "2022-02-22 12:00:29", end: "2022-02-22 17:59:55" }
            ]
        }
    ];
    
    const result = {};
    
    // Process each employee's time punches
    employeeData.forEach(employee => {
        let totalHours = 0;
        let regularHours = 0;
        let overtimeHours = 0;
        let doubleTimeHours = 0;
        let wageTotal = 0;
        let benefitsTotal = 0;
    
        // Initialize variables to track remaining hours for regular and overtime pay
        let remainingRegularHours = 40; // Maximum regular hours
        let remainingOvertimeHours = 8;  // Maximum overtime hours
        
        // Process each punch for the employee
        employee.timePunch.forEach(punch => {
            const jobRate = jobMeta[punch.job].rate; // Get job rate
            const benefitsRate = jobMeta[punch.job].benefitsRate; // Get benefits rate
            const startTime = new Date(punch.start); // Convert start time to Date object
            const endTime = new Date(punch.end); // Convert end time to Date object
            const hoursWorked = (endTime - startTime) / 3600000; // Calculate hours worked in hours
    
            let hoursToAllocate = hoursWorked; // Hours left to allocate to regular, overtime, or double-time
    
            // Allocate hours to regular time
            if (remainingRegularHours > 0) {
                const regularHoursToAdd = Math.min(hoursToAllocate, remainingRegularHours);
                wageTotal += regularHoursToAdd * jobRate; // wage for regular hours
                benefitsTotal += regularHoursToAdd * benefitsRate; // benefits for regular hours
                remainingRegularHours -= regularHoursToAdd; // remaining regular hours
                hoursToAllocate -= regularHoursToAdd; // hours left to allocate
            }
            // Allocate hours to overtime
            if (remainingOvertimeHours > 0 && hoursToAllocate > 0) {
                const overtimeHoursToAdd = Math.min(hoursToAllocate, remainingOvertimeHours);
                wageTotal += overtimeHoursToAdd * jobRate * 1.5; // wage for overtime (1.5x rate)
                benefitsTotal += overtimeHoursToAdd * benefitsRate; // benefits for overtime
                remainingOvertimeHours -= overtimeHoursToAdd; // remaining overtime
                hoursToAllocate -= overtimeHoursToAdd; // hours left to allocate
            }
            // Allocate remaining hours to double-time
            if (hoursToAllocate > 0) {
                doubleTimeHours += hoursToAllocate; // remaining hours to double-time
                wageTotal += hoursToAllocate * jobRate * 2; // wage for double-time (2x rate)
                benefitsTotal += hoursToAllocate * benefitsRate; // benefits for double-time
            }
    
            // Update total hours worked
            totalHours += hoursWorked;
        });
    
        // Prepare the final result for this employee
        result[employee.employee] = {
            employee: employee.employee,
            regular: (40 - remainingRegularHours).toFixed(4),
            overtime: (8 - remainingOvertimeHours).toFixed(4),
            doubletime: doubleTimeHours.toFixed(4),
            wageTotal: wageTotal.toFixed(4),
            benefitTotal: benefitsTotal.toFixed(4)
        };
    });
    
    // Output the final result
    // console.log(result);
    //select div to display results
    const resultDiv = document.getElementById('result');
    
    // iterate over each employee and display them in the HTML
    function iterateObject() {
        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                value = result[key];
                console.log(key, value);
                // create h2 element and add the employee name
                let h2 = document.createElement('h2');
                h2.textContent = key+':';
                resultDiv.append(h2);
    
                for (let key in value) {
                    if (value.hasOwnProperty(key)) {
                        val = value[key];
                        // console.log(key, val);
                        //create p, span and b elements and add the keys and values
                        let p = document.createElement('p');
                        let span = document.createElement('span');
                        let b = document.createElement('b');
                        p.textContent = key + ': ';
                        b.textContent = val;
                        p.append(b);
                        resultDiv.append(p);
                    }
                }
            }
        }
    }
    iterateObject();
}
