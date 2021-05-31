/* globals chrome, XMLSerializer */
// access page source
const generatedSource = new XMLSerializer().serializeToString(document);
// get episode title
const reMediaTitle = /<title>(.+?) Episode/; // https://regex101.com/r/zOb55Y/1
const matchesMediaTitle = generatedSource.match(reMediaTitle);
let contentTitle = null;
if (matchesMediaTitle) {
    contentTitle = matchesMediaTitle[1];
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === 'get-media-title') {
        sendResponse(contentTitle);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udGVudC1zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBRW5DLHFCQUFxQjtBQUNyQixNQUFNLGVBQWUsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBRXZFLG9CQUFvQjtBQUNwQixNQUFNLFlBQVksR0FBRyxzQkFBc0IsQ0FBQSxDQUFDLGtDQUFrQztBQUM5RSxNQUFNLGlCQUFpQixHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7QUFFN0QsSUFBSSxZQUFZLEdBQVcsSUFBSSxDQUFBO0FBQy9CLElBQUksaUJBQWlCLEVBQUU7SUFDckIsWUFBWSxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO0NBQ3BDO0FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRTtJQUN0RSxJQUFJLE9BQU8sS0FBSyxpQkFBaUIsRUFBRTtRQUNqQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUE7S0FDM0I7QUFDSCxDQUFDLENBQUMsQ0FBQSJ9