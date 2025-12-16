export function getPublicIdFromUrl(url) {
    try {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1];
        const publicId = fileName.split('.')[0]; // removes .jpg/.png etc.

        // Optional: if you have folders in Cloudinary, reconstruct the path
        const startIndex = parts.findIndex(part => part === 'upload');
        const publicIdWithFolder = parts.slice(startIndex + 1, parts.length).join('/').split('.')[0];

        return publicIdWithFolder;
    } catch {
        return null;
    }
}

export const getComponentByType = (componentData, type) => {
    return componentData?.components?.find((c) => c.type === type)?.data || null;
};

export const isItemActive = (item, pathname) => {
    console.log("Item====>", item);
    if (item.url && pathname.startsWith(item.url)) return true;
    if (item.items) {
        return item.items.some((sub) => pathname.startsWith(sub.url));
    }
    return false;
};