export function anilistNotification(message) {
    const options = {
        type: 'basic',
        title: 'Anilist',
        message: message,
        iconUrl: '../images/icon128.png'
    };
    chrome.notifications.create(null, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbm90aWZpY2F0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsbUJBQW1CLENBQUMsT0FBZTtJQUNqRCxNQUFNLE9BQU8sR0FBRztRQUNaLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLFNBQVM7UUFDaEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsT0FBTyxFQUFDLHVCQUF1QjtLQUNsQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLENBQUMifQ==