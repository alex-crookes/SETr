import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { ThemeContext } from "../ds/ThemeProvider";
import XDate from "xdate";
import SecondaryButton from "../ds/molecules/SecondaryButton";
import ElementBlock from "../ds/molecules/ElementBlock";
import { DateTime } from "luxon";
import LinkButton from "../ds/molecules/LinkButton";
import { View } from "react-native";
import { translate } from "../localization/Localization";

const DateRangePicker = (props: Props) => {
  const { colors } = useContext(ThemeContext);
  const [isFromDatePicked, setIsFromDatePicked] = useState(false);
  const [isToDatePicked, setIsToDatePicked] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [startMarked, setStartMarked] = useState("");

  const markTextColor = colors.onPrimary;
  const markColor = colors.primary;

  const [selectingDate, setSelectingDate] = useState(false);

  useEffect(() => {
    if (!props.startDate || !props.endDate) return;

    let fromDate = props.startDate;
    let toDate = props.endDate;

    let markedDatesTemp = {
      [fromDate]: {
        startingDay: true,
        color: markColor,
        textColor: markTextColor,
      },
    };

    let [markedDates, range] = setupMarkedDates(
      fromDate,
      toDate,
      markedDatesTemp
    );

    setMarkedDates(markedDates);
    setStartMarked(fromDate);
  }, []);

  const setupStartMarker = (day) => {
    let markedDates = {
      [day.dateString]: {
        startingDay: true,
        color: markColor,
        textColor: markTextColor,
      },
    };
    setIsFromDatePicked(true);
    setIsToDatePicked(false);
    setStartMarked(day.dateString);
    setMarkedDates(markedDates);
  };

  const setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate);
    let mToDate = new XDate(toDate);
    let range = mFromDate.diffDays(mToDate);
    if (range >= 0) {
      if (range == 0) {
        markedDates = {
          [toDate]: {
            color: markColor,
            textColor: markTextColor,
          },
        };
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString("yyyy-MM-dd");
          if (i < range) {
            markedDates[tempDate] = {
              color: markColor,
              textColor: markTextColor,
            };
          } else {
            markedDates[tempDate] = {
              endingDay: true,
              color: markColor,
              textColor: markTextColor,
            };
          }
        }
      }
    }
    return [markedDates, range];
  };

  const handleDayPress = (day) => {
    if (!isFromDatePicked || (isFromDatePicked && isToDatePicked)) {
      setupStartMarker(day);
      return;
    }
    if (!isToDatePicked) {
      let marketDates = { ...markedDates };
      let [newMarkedDates, range] = setupMarkedDates(
        startMarked,
        day.dateString,
        marketDates
      );
      if (range >= 0) {
        setIsFromDatePicked(true);
        setIsToDatePicked(true);
        setMarkedDates(newMarkedDates);
        setSelectingDate(false);
        props.onSuccess(new Date(startMarked), new Date(day.dateString));
      } else {
        setupStartMarker(day);
      }
    }
  };

  const handleResetDateRange = () => {
    setIsFromDatePicked(false);
    setIsToDatePicked(false);
    setMarkedDates({});
    setStartMarked("");
    setSelectingDate(false);
    props.onClear();
  };

  const handleOpenDateRange = () => {
    setSelectingDate(true);
  };

  const calendar = () => {
    return (
      <>
        <Calendar
          {...props}
          markingType="period"
          current={startMarked}
          markedDates={markedDates}
          onDayPress={handleDayPress}
          headerStyle={{ backgroundColor: colors.secondary.toString() }}
          theme={{
            arrowColor: colors.onPrimary.toString(),
            backgroundColor: colors.background.toString(),
            calendarBackground: colors.background.toString(),
            textSectionTitleColor: colors.onBackground.toString(),
            selectedDayBackgroundColor: colors.primary.toString(),
            selectedDayTextColor: colors.onPrimary.toString(),
            dayTextColor: colors.onBackground.toString(),
            textDisabledColor: colors.onSecondary.toString(),
          }}
        />
        {isFromDatePicked && (
          <LinkButton
            smallMode
            title={translate("common_Reset")}
            onPress={handleResetDateRange}
          />
        )}
      </>
    );
  };

  const openCalendar = () => {
    const arr = Object.keys(markedDates);
    const start = arr.filter((key) => markedDates[key].startingDay);
    const end = arr.filter((key) => markedDates[key].endingDay);

    const formattedStart = DateTime.fromISO(start[0]).toLocaleString(
      DateTime.DATE_MED
    );
    const formattedEnd = DateTime.fromISO(end[0]).toLocaleString(
      DateTime.DATE_MED
    );
    const title =
      start.length > 0 && end.length > 0
        ? `${formattedStart} - ${formattedEnd}`
        : "Select Date Range";
    return (
      <SecondaryButton
        icon="calendar"
        smallMode={true}
        title={title}
        onPress={handleOpenDateRange}
        disabled={false}
      />
    );
  };

  return (
    <ElementBlock>{selectingDate ? calendar() : openCalendar()}</ElementBlock>
  );
};

export default DateRangePicker;

type Props = {
  startDate?: string | undefined;
  endDate?: string | undefined;
  onSuccess: (startDate: Date, endDate: Date) => void;
  onClear: () => void;
};
