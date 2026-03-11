import * as yup from "yup";

export const latestConcertAddFormValidationSchema = yup.object().shape({
    concert_name: yup.string().required("Concert name is required"),
    concert_description: yup.string().required("Concert description is required"),
    youtube_link: yup
        .string()
        .url("Enter a valid YouTube link")
        .required("YouTube link is required"),
    concert_image_url: yup.string().required("Concert image is required"),
});

export const pressCoverageAddValidationSchema = yup.object().shape({
    poster_title: yup.string().required("Poster title is required"),
    poster_image: yup.string().required("Poster image is required"),
    poster_song: yup
        .string()
        .required("Song iframe is required")
        .test(
            "is-soundcloud-iframe",
            "Only SoundCloud iframe is allowed",
            (value) => {
                if (!value) return false;

                // check iframe tag
                const isIframe = /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/i.test(value);

                // check SoundCloud source
                const isSoundCloud =
                    /src=["']https?:\/\/(w\.soundcloud\.com|api\.soundcloud\.com)/i.test(
                        value
                    );

                return isIframe && isSoundCloud;
            }
        ),
});

export const addMediaFormValidationSchema = yup.object().shape({
    title: yup.string().required("Media title is required"),
    file_url: yup.string().required("File URL is required"),
    file_type: yup.string().oneOf(["image", "video"]).required("Media type is required"),
});

export const addOnthePageContentValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    section_image_url: yup.string().required("Please Upload a section image")
})

export const spokeProductionFormValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    buttonText: yup.string().required("Button text is required"),
    buttonUrl: yup.string().url('Invalid URL format').required('URL is required'),
})


export const getWithBookingFormValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    section_image_url: yup.string().required("Please Upload a section image")
})

export const forLargerShowsValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    section_image_url: yup.string().required("Please Upload a section image"),
    subsection1_title: yup.string().required("Subsection 1 title is required"),
    subsection1_description: yup.string().required("Subsection 1 description is required"),
    subsection2_title: yup.string().required("Subsection 2 title is required"),
    subsection2_description: yup.string().required("Subsection 1 description is required"),
})


export const optionalAddOnValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    section_image_url: yup.string().required("Please Upload a section image"),
    subsection1_title: yup.string().required("Subsection 1 title is required"),
    subsection1_description: yup.string().required("Subsection 1 description is required"),
    subsection2_title: yup.string().required("Subsection 2 title is required"),
    subsection2_description: yup.string().required("Subsection 2 description is required"),
    subsection3_title: yup.string().required("Subsection 3 title is required"),
    subsection3_description: yup.string().required("Subsection 3 description is required"),
})

export const whatTheySayValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    button_text: yup.string().required("Button text is required"),
    button_link: yup.string().url('Invalid URL format').required('URL is required'),
})

export const shopPageValidationSchema = yup.object().shape({
    title: yup.string().required("Section title is required"),
    description: yup.string().required("Section description is required"),
    button_text: yup.string().required("Button text is required"),
    button_url: yup.string().url('Invalid URL format').required('URL is required'),
})

export const commonBannerValidationSchema = yup.object().shape({
    title: yup.string().required("Media title is required"),
    file_url: yup.string().required("File URL is required"),
});

export const artistSectionValidationSchema = yup.object().shape({
    // file_url: yup.string().required("File URL is required"),
    buttonText: yup.string().required("Button text is required"),
    buttonLink: yup.string().url('Invalid URL format').required('URL is required'),
})


