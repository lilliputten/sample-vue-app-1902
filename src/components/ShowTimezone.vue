
<template>
  <div class="ShowTimezone">
    <form novalidate class="md-layout">
      <md-card class="md-layout-item">

        <md-card-header>
          <div class="md-title">City Timezones</div>
        </md-card-header>

        <md-card-content>

          <div class="md-layout md-gutter">

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="city">City</label>
                <md-select name="city" id="city" placeholder="Select source city here..." md-dense :disabled="sending">
                  <md-option value="moscow">Moscow</md-option>
                  <md-option value="new york">New York</md-option>
                </md-select>
                <span class="md-error">The city is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 timezone-item">
              <md-field>
                <label for="timezone">Your timezone:</label>
                <md-input name="timezone" id="timezone" placeholder="Target timezone will be displayed here..." disabled />
              </md-field>
            </div>

          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Fetch timezone</md-button>
        </md-card-actions>

      </md-card>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'ShowTimezone',
    data: () => ({
      form: {
        city: null,
      },
      cityFetched: false,
      sending: false,
      lastCity: null
    }),
  }
</script>

<!-- Component styles -->
<style scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .timezone-item {
    opacity: .5;
  }
</style>

<!-- Global form styles -->
<style>
  .md-select-menu {
    background-color: #fff;
  }
</style>
