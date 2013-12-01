require "spec_helper"

feature 'visitor arrives at home page' do
  scenario 'user clicks to start stream'
    # click_link '#start-stream'
    expect(page).to have_content('Tweet')
end