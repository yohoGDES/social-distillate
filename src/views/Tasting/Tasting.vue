<template>
<!-- 
  Users can create events
Users can assign themselves as hosts and add co-hosts
Users can create two event types: Tasting or Special Event
Hosts can select their saved location or enter a different hosting location
Hosts can choose for the tasting to be blind.
If a tasting is blind, the host can choose whether to reveal after each dram or at the end.
Hosts can choose from pre-entered bottles or enter a new one on the fly.
Only the host and admin will be able to see blind tastings.
The host controls the flow in the app. Once next dram is selected, users will receive the next scoring sheet.
-->
  Host (user)
  Co-Hosts (user)
  Group (relation: group)
  Location (saved user location or entered address)
  Date (date)
  Blind (boolean)
    Reveal after each dram or at end (string: dram/end)
  Tasting Style: Guided / Freeflow (string)
  Bottles (Spirits) (relation: beverage)
  Show progress bar / number of bottles? (boolean)
  Attendees (pointers - user)
  ----

  Needs to load / Create:
  - Rating component (separate this into a new component)
  - Tasting Progress Bar (1 of 3 bottles)

</template>